"use server"

export type Article = {
  _id: string
  title: string
  excerpt: string
  slug: string
  img?: string
}

export async function getArticles(): Promise<Article[]> {
  const url = process.env.ALL_POSTS_URL
  if (!url) {
    throw new Error("Missing URL")
  }

  const res = await fetch(url)

  const articles = await res.json()
  return articles.result
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug) {
    return null
  }

  const url = process.env.SINGLE_POST_URL?.replace(
    "hollow-knight-silksong-y-el-fomo",
    slug
  )
  if (!url) {
    throw new Error("Missing URL")
  }

  const res = await fetch(url)

  const article = await res.json()
  return article.result
}
