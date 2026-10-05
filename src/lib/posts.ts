import type { Category } from "./site"

// Lo mínimo que necesitan estas funciones; las entradas de la colección lo cumplen.
export type PostLike = {
  id: string
  body?: string
  data: { publishedAt: Date; category: Category; tags: string[]; draft: boolean }
}

export function sortPosts<T extends PostLike>(posts: T[], includeDrafts = false): T[] {
  return posts
    .filter((p) => includeDrafts || !p.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
}

/** Misma categoría > más tags en común > más reciente. Si faltan, rellena con los últimos. */
export function relatedPosts<T extends PostLike>(current: T, posts: T[], limit = 6): T[] {
  const score = (p: T) =>
    (p.data.category === current.data.category ? 100 : 0) +
    p.data.tags.filter((t) => current.data.tags.includes(t)).length
  return posts
    .filter((p) => p.id !== current.id)
    .sort((a, b) => score(b) - score(a) || b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, limit)
}

export function readingMinutes(markdown = ""): number {
  const words = markdown.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function usedCategories<T extends PostLike>(posts: T[]): Category[] {
  return [...new Set(posts.map((p) => p.data.category))]
}
