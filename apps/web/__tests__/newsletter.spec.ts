import { describe, it, expect, vi, beforeEach } from "vitest"
import * as newsletterModule from "../app/lib/newsletter"

// Mock PrismaClient
vi.mock("@prisma/client/extension", () => {
  return {
    PrismaClient: class {
      newsletter = {
        create: vi.fn().mockResolvedValue({ email: "test@example.com" }),
      }
    },
  }
})

describe("subscribeToNewsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns success: true for a valid email", async () => {
    const result =
      await newsletterModule.subscribeToNewsletter("test@example.com")
    expect(result).toEqual({ success: true })
  })

  it("returns success: false for an invalid email", async () => {
    const result = await newsletterModule.subscribeToNewsletter("invalid-email")
    expect(result).toEqual({ success: false })
  })
})
