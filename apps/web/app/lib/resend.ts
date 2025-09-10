import { Resend } from "resend"
import WelcomeEmail from "../components/email-template/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Rafa <hello@rafacanosa.dev>",
      to: [email],
      subject: "🎉 Bienvenido a la newsletter de news.rafacanosa.dev",
      react: WelcomeEmail(),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
