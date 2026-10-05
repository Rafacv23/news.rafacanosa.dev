import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  status: text("status", { enum: ["pending", "active"] }).notNull().default("pending"),
  // Un solo token secreto por suscriptor, para confirmar y para darse de baja.
  // Al darse de baja se borra la fila: no guardamos emails que no hacen falta.
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  confirmedAt: integer("confirmed_at", { mode: "timestamp" }),
})
