import { z } from "zod"

export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: "Proporciona una dirección de email válida." }),
})
