"use client"

import { useState } from "react"
import { subscribeToNewsletter } from "../../lib/newsletter"
import { Button } from "../button/button"
import styles from "./newsletter.module.css"

export default function Newsletter() {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")?.toString()
    try {
      if (email) {
        setLoading(true)
        await subscribeToNewsletter(email)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
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
