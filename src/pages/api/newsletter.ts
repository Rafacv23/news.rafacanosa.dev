import type { APIRoute } from "astro"
import { createDb } from "../../db/index.ts"
import { sendWithResend } from "../../lib/email.ts"
import { subscribe } from "../../lib/newsletter.ts"

export const prerender = false

export const POST: APIRoute = async ({ request, url }) => {
  const form = await request.formData()
  // Campo trampa relleno = bot. Respondemos como si todo fuese bien.
  if (form.get("website")) return Response.json({ ok: true, message: "¡Casi está! Revisa tu email." })

  const result = await subscribe(createDb(), String(form.get("email") ?? ""), url.origin, sendWithResend)
  return Response.json(result, { status: result.ok ? 200 : 400 })
}
