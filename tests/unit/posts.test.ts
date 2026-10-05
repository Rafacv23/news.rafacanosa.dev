import { describe, expect, it } from "vitest"
import { readingMinutes, relatedPosts, sortPosts, usedCategories, type PostLike } from "../../src/lib/posts.ts"

const post = (id: string, date: string, category: PostLike["data"]["category"], tags: string[] = [], draft = false): PostLike => ({
  id,
  data: { publishedAt: new Date(date), category, tags, draft },
})

const posts = [
  post("a", "2025-01-01", "videojuegos", ["rpg"]),
  post("b", "2025-03-01", "videojuegos"),
  post("c", "2025-02-01", "libros", ["rpg"]),
  post("d", "2025-04-01", "videojuegos", ["rpg", "indie"]),
  post("borrador", "2025-05-01", "videojuegos", [], true),
]

describe("posts", () => {
  it("ordena por fecha y oculta borradores salvo que se pidan", () => {
    expect(sortPosts(posts).map((p) => p.id)).toEqual(["d", "b", "c", "a"])
    expect(sortPosts(posts, true)[0].id).toBe("borrador")
  })

  it("relacionados: misma categoría > tags en común > fecha, y rellena con otras categorías", () => {
    const published = sortPosts(posts)
    const current = published.find((p) => p.id === "a")!
    expect(relatedPosts(current, published).map((p) => p.id)).toEqual(["d", "b", "c"])
    expect(relatedPosts(current, published, 1).map((p) => p.id)).toEqual(["d"])
  })

  it("tiempo de lectura nunca baja de 1 minuto", () => {
    expect(readingMinutes("")).toBe(1)
    expect(readingMinutes("palabra ".repeat(1100))).toBe(5)
  })

  it("solo devuelve categorías con artículos", () => {
    expect(usedCategories(sortPosts(posts))).toEqual(["videojuegos", "libros"])
  })
})
