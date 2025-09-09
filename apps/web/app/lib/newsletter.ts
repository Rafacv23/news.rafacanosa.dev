"use server"
import { PrismaClient } from "@prisma/client"
import { newsletterSchema } from "./schemas"

const prisma = new PrismaClient()

export async function subscribeToNewsletter(email: string) {
  const result = newsletterSchema.safeParse({ email })
  if (!result.success) {
    return { success: false }
  }

  try {
    await prisma.user.create({
      data: { email },
    })
    return { success: true, message: "¡Suscrito con éxito! Revisa tu email." }
  } catch (error: any) {
    // Optionally, handle duplicate email error:
    if (error.code === "P2002") {
      return {
        success: false,
        message: "Este email ya está suscrito. Prueba con otro.",
      }
    }
    return {
      success: false,
      message: "Error al suscribirse. Inténtalo de nuevo.",
    }
  }
}
