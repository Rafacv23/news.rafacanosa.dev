import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema.ts"

export function createDb(url = process.env.TURSO_DATABASE_URL, authToken = process.env.TURSO_AUTH_TOKEN) {
  if (!url) throw new Error("Falta TURSO_DATABASE_URL")
  return drizzle(createClient({ url, authToken }), { schema })
}

export type Db = ReturnType<typeof createDb>
