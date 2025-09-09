"use client"

import { useState } from "react"
import { subscribeToNewsletter } from "../../lib/newsletter"
import { Button } from "../button/button"
import styles from "./newsletter.module.css"
import { newsletterSchema } from "../../lib/schemas"
import { toast } from "sonner"

export default function Newsletter() {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget // Save reference early
    const formData = new FormData(form)
    const email = formData.get("email")?.toString()

    if (!email) {
      toast.error("El email es obligatorio.")
      return
    }

    const result = newsletterSchema.safeParse({ email })
    if (!result.success) {
      // Show the first error message from Zod
      toast.error("Email inválido")
      return
    }

    try {
      setLoading(true)
      const response = await subscribeToNewsletter(email)
      if (!response?.success) {
        toast.error(
          response?.message || "Error al suscribirse. Inténtalo de nuevo."
        )
        return
      }
      toast.success(response.message)
      form.reset()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.newsletter}>
      <h3 className={styles.title}>Newsletter</h3>
      <p className={styles.paragraph}>
        No spam, newsletter de contenido semanal.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          required
          name="email"
          id="email"
          placeholder="Tu email"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Suscribirme"}
        </Button>
      </form>
    </section>
  )
}
