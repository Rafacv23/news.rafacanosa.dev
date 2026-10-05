import { beforeEach, describe, expect, it } from "vitest"
import { migrate } from "drizzle-orm/libsql/migrator"
import { createDb, type Db } from "../../src/db/index.ts"
import type { Email } from "../../src/lib/email.ts"
import { confirm, subscribe, unsubscribe } from "../../src/lib/newsletter.ts"

const BASE = "https://blog.test"
let db: Db
let sent: Email[]
const send = async (e: Email) => void sent.push(e)
const tokenFrom = (e: Email) => e.text.match(/token=([\w-]+)/)![1]

beforeEach(async () => {
  db = createDb(":memory:")
  await migrate(db, { migrationsFolder: "drizzle" })
  sent = []
})

describe("newsletter", () => {
  it("rechaza emails inválidos sin tocar la BBDD", async () => {
    expect(await subscribe(db, "no-es-un-email", BASE, send)).toMatchObject({ ok: false })
    expect(sent).toHaveLength(0)
    expect(await db.query.subscribers.findMany()).toHaveLength(0)
  })

  it("doble opt-in: pending → confirmar → active + bienvenida con List-Unsubscribe", async () => {
    expect((await subscribe(db, "  Ana@Example.com ", BASE, send)).ok).toBe(true)
    const [row] = await db.query.subscribers.findMany()
    expect(row).toMatchObject({ email: "ana@example.com", status: "pending" })
    expect(sent[0].text).toContain(`${BASE}/newsletter/confirmar?token=${row.token}`)

    expect(await confirm(db, tokenFrom(sent[0]), BASE, send)).toBe("confirmed")
    expect((await db.query.subscribers.findFirst())!.status).toBe("active")
    expect(sent[1].headers!["List-Unsubscribe"]).toContain(`/newsletter/baja?token=${row.token}`)

    expect(await confirm(db, row.token, BASE, send)).toBe("already")
    expect(sent).toHaveLength(2)
  })

  it("no revela si un email ya está suscrito ni reenvía nada", async () => {
    await subscribe(db, "ana@example.com", BASE, send)
    await confirm(db, tokenFrom(sent[0]), BASE, send)
    const again = await subscribe(db, "ana@example.com", BASE, send)
    expect(again).toMatchObject({ ok: true })
    expect(sent).toHaveLength(2)
  })

  it("reenvía la confirmación con el mismo token si sigue pendiente", async () => {
    await subscribe(db, "ana@example.com", BASE, send)
    await subscribe(db, "ana@example.com", BASE, send)
    expect(sent).toHaveLength(2)
    expect(tokenFrom(sent[0])).toBe(tokenFrom(sent[1]))
    expect(await db.query.subscribers.findMany()).toHaveLength(1)
  })

  it("informa del error si Resend falla", async () => {
    const failing = async () => { throw new Error("boom") }
    expect(await subscribe(db, "ana@example.com", BASE, failing)).toMatchObject({ ok: false })
  })

  it("token desconocido no confirma nada", async () => {
    expect(await confirm(db, "nope", BASE, send)).toBe("invalid")
  })

  it("darse de baja borra el email", async () => {
    await subscribe(db, "ana@example.com", BASE, send)
    const token = tokenFrom(sent[0])
    expect(await unsubscribe(db, token)).toBe(true)
    expect(await db.query.subscribers.findMany()).toHaveLength(0)
    expect(await unsubscribe(db, token)).toBe(false)
  })
})

describe("limpieza", () => {
  it("borra pendientes de más de 7 días pero no activos ni recientes", async () => {
    const { subscribers } = await import("../../src/db/schema.ts")
    const old = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    await db.insert(subscribers).values([
      { email: "viejo@x.com", token: "t1", createdAt: old },
      { email: "activo@x.com", token: "t2", createdAt: old, status: "active" },
      { email: "nuevo@x.com", token: "t3" },
    ])
    const { purgeUnconfirmed } = await import("../../src/lib/newsletter.ts")
    await purgeUnconfirmed(db)
    expect((await db.query.subscribers.findMany()).map((s) => s.email).sort()).toEqual(["activo@x.com", "nuevo@x.com"])
  })
})
