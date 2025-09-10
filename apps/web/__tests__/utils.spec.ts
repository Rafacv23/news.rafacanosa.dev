import { describe, it, expect } from "vitest"
import { buildSanityImgUrl } from "../app/lib/utils"

describe("buildSanityImgUrl", () => {
  it("builds a correct Sanity image URL from a valid ref", () => {
    const ref = "image-18e950209fe03e10792277b246ac921f2e25dc68-1200x840-webp"
    const url = buildSanityImgUrl(ref)
    expect(url).toBe(
      "https://cdn.sanity.io/images/d5wqbyn6/production/18e950209fe03e10792277b246ac921f2e25dc68-1200x840.webp"
    )
  })

  it("throws an error for an invalid ref", () => {
    expect(() => buildSanityImgUrl("invalid-ref")).toThrow("Invalid Sanity")
  })
})
