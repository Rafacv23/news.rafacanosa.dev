import { Resend } from "resend"
import { SITE } from "./site.ts"

export type Email = {
  to: string
  subject: string
  html: string
  text: string
  headers?: Record<string, string>
}
export type Send = (email: Email) => Promise<void>

export const FROM = "Rafa Canosa <hello@rafacanosa.dev>"

export const sendWithResend: Send = async (email) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({ from: FROM, ...email })
  if (error) throw new Error(error.message)
}

export const unsubscribeUrl = (baseUrl: string, token: string) => `${baseUrl}/newsletter/baja?token=${token}`

/** Cabeceras para que Gmail/Yahoo muestren el botón "Cancelar suscripción" de un clic (hacen POST a la URL). */
export const unsubscribeHeaders = (baseUrl: string, token: string) => ({
  "List-Unsubscribe": `<${unsubscribeUrl(baseUrl, token)}>`,
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
})

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

function layout(preview: string, body: string, unsubscribe?: string) {
  const footer = unsubscribe
    ? `Recibes este email porque te suscribiste a la newsletter de ${SITE.name}.<br>
       <a href="${unsubscribe}" style="color:#21201c;font-weight:600;text-decoration:none">Darme de baja</a>`
    : `Si no has sido tú, ignora este email y no volverás a saber de mí.`
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;background:#fdfdfc;font-family:sans-serif">
<span style="display:none">${esc(preview)}</span>
<div style="max-width:600px;margin:0 auto;padding:20px;color:#030712a7;font-size:14px;line-height:20px">
${body}
<p style="margin-top:30px">Un saludo,<br>– Rafa Canosa</p>
<hr style="border:none;border-top:1px solid #f5f4f4;margin:30px 0">
<p style="text-align:center;font-size:12px">© ${new Date().getFullYear()} blog.rafacanosa.dev · ${footer}</p>
</div></body></html>`
}

const h = (s: string) => `<h2 style="font-size:22px;font-weight:600;margin:16px 0 8px;color:#21201c">${s}</h2>`
const p = (s: string) => `<p>${s}</p>`
const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;padding:10px 16px;background:#21201c;color:#fdfdfc;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px">${label}</a>`

export function confirmEmail(to: string, confirmUrl: string): Email {
  return {
    to,
    subject: `Confirma tu suscripción a ${SITE.name}`,
    html: layout(
      "Un clic y listo",
      h("Confirma tu suscripción") +
        p(`Alguien (espero que tú) ha pedido suscribirse a la newsletter de ${SITE.name} con este email.`) +
        button(confirmUrl, "Confirmar suscripción"),
    ),
    text: `Confirma tu suscripción a ${SITE.name}: ${confirmUrl}\n\nSi no has sido tú, ignora este email.`,
  }
}

export function welcomeEmail(to: string, baseUrl: string, token: string): Email {
  const page = unsubscribeUrl(baseUrl, token)
  return {
    to,
    subject: `🎉 Bienvenido a la newsletter de ${SITE.name}`,
    html: layout(
      "Ya estás dentro",
      h("¡Bienvenido a bordo! 🎉") +
        p("Gracias por suscribirte. Te escribiré cuando publique algo nuevo sobre videojuegos, libros, cine o cultura digital. Sin spam.") +
        button(baseUrl, "Ir al blog →"),
      page,
    ),
    text: `¡Bienvenido! Te escribiré cuando publique algo nuevo. ${baseUrl}\n\nDarte de baja: ${page}`,
    headers: unsubscribeHeaders(baseUrl, token),
  }
}

export function newPostEmail(
  to: string,
  baseUrl: string,
  token: string,
  post: { title: string; description: string; url: string },
): Email {
  const page = unsubscribeUrl(baseUrl, token)
  return {
    to,
    subject: post.title,
    html: layout(
      post.description,
      h(esc(post.title)) + p(esc(post.description)) + button(post.url, "Leer el artículo →"),
      page,
    ),
    text: `${post.title}\n\n${post.description}\n\nLéelo aquí: ${post.url}\n\nDarte de baja: ${page}`,
    headers: unsubscribeHeaders(baseUrl, token),
  }
}
