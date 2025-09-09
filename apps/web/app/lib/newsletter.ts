"use server"
import { PrismaClient } from "@prisma/client/extension"
import { newsletterSchema } from "./schemas"

const prisma = new PrismaClient()

export async function subscribeToNewsletter(email: string) {
  const result = newsletterSchema.safeParse({ email })
  if (!result.success) {
    return { success: false }
  }

  await prisma.newsletter.create({
    data: {
      email,
    },
  })

  return { success: true }
}
