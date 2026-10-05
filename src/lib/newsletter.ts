import { randomBytes } from "node:crypto"
import { and, eq, lt } from "drizzle-orm"
import { z } from "astro/zod"
import type { Db } from "../db/index.ts"
import { subscribers } from "../db/schema.ts"
import { confirmEmail, welcomeEmail, type Send } from "./email.ts"

export const emailSchema = z.email()

type Result = { ok: boolean; message: string }

const CHECK_INBOX = "¡Casi está! Revisa tu email y confirma la suscripción."

export async function subscribe(db: Db, rawEmail: string, baseUrl: string, send: Send): Promise<Result> {
  const parsed = emailSchema.safeParse(rawEmail.trim().toLowerCase())
  if (!parsed.success) return { ok: false, message: "Email inválido." }
  const email = parsed.data

  await purgeUnconfirmed(db)
  const existing = await db.query.subscribers.findFirst({ where: eq(subscribers.email, email) })
  // Mismo mensaje si ya está suscrito: no revelamos qué emails están en la lista.
  if (existing?.status === "active") return { ok: true, message: CHECK_INBOX }

  const token = existing?.token ?? randomBytes(24).toString("base64url")
  if (!existing) await db.insert(subscribers).values({ email, token })

  try {
    // ponytail: sin límite de reenvíos; si alguien abusa del formulario, añadir rate limit por IP/email.
    await send(confirmEmail(email, `${baseUrl}/newsletter/confirmar?token=${token}`))
  } catch (error) {
    console.error("Error enviando email de confirmación", error)
    return { ok: false, message: "No he podido enviarte el email. Inténtalo de nuevo." }
  }
  return { ok: true, message: CHECK_INBOX }
}

export async function confirm(db: Db, token: string, baseUrl: string, send: Send) {
  const row = await db.query.subscribers.findFirst({ where: eq(subscribers.token, token) })
  if (!row) return "invalid" as const
  if (row.status === "active") return "already" as const

  await db
    .update(subscribers)
    .set({ status: "active", confirmedAt: new Date() })
    .where(eq(subscribers.id, row.id))
  // La bienvenida no es crítica: si falla, la suscripción sigue confirmada.
  await send(welcomeEmail(row.email, baseUrl, token)).catch((e) => console.error("Error enviando bienvenida", e))
  return "confirmed" as const
}

/** Borra al suscriptor. Devuelve false si el token no existe. */
export async function unsubscribe(db: Db, token: string) {
  const deleted = await db.delete(subscribers).where(eq(subscribers.token, token)).returning()
  return deleted.length > 0
}

/** Borra las suscripciones sin confirmar de hace más de 7 días (lo promete /privacidad). */
export async function purgeUnconfirmed(db: Db) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  await db.delete(subscribers).where(and(eq(subscribers.status, "pending"), lt(subscribers.createdAt, weekAgo)))
}
