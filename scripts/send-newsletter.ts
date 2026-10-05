// Envía el aviso de un artículo nuevo a todos los suscriptores confirmados.
// Uso: pnpm newsletter:send <slug> [--dry-run]
import { readFileSync } from "node:fs"
import { eq } from "drizzle-orm"
import { Resend } from "resend"
import { createDb } from "../src/db/index.ts"
import { subscribers } from "../src/db/schema.ts"
import { FROM, newPostEmail } from "../src/lib/email.ts"
import { purgeUnconfirmed } from "../src/lib/newsletter.ts"
import { SITE } from "../src/lib/site.ts"

const [slug, flag] = process.argv.slice(2)
if (!slug) throw new Error("Uso: pnpm newsletter:send <slug> [--dry-run]")

const md = readFileSync(`src/content/articulos/${slug}/index.md`, "utf8")
const field = (name: string) => JSON.parse(md.match(new RegExp(`^${name}: (.+)$`, "m"))?.[1] ?? "null")
if (field("draft") === true) throw new Error("Ese artículo es un borrador")
const post = { title: field("title"), description: field("description"), url: `${SITE.url}/${slug}` }

const db = createDb()
await purgeUnconfirmed(db)
const list = await db.query.subscribers.findMany({ where: eq(subscribers.status, "active") })
console.log(`«${post.title}» → ${list.length} suscriptores`)
if (flag === "--dry-run") process.exit(0)

const resend = new Resend(process.env.RESEND_API_KEY)
for (let i = 0; i < list.length; i += 100) {
  const batch = list.slice(i, i + 100).map((s) => ({ from: FROM, ...newPostEmail(s.email, SITE.url, s.token, post) }))
  const { error } = await resend.batch.send(batch)
  if (error) throw new Error(`Falló el lote ${i / 100 + 1}: ${error.message}`)
  console.log(`Enviados ${i + batch.length}/${list.length}`)
}
