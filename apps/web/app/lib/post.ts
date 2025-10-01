"use server"

export type Article = {
  _id: string
  title: string
  excerpt: string
  slug: string | null
  mainImage: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  publishedAt: string
  seo: any | null
  author: {
    _id: string
    name: string
    image: {
      _type: string
      asset: {
        _ref: string
        _type: string
      }
      crop?: {
        _type: string
        bottom: number
        left: number
        right: number
        top: number
      }
      hotspot?: {
        _type: string
        height: number
        width: number
        x: number
        y: number
      }
    }
  }
  categories: Array<{
    _id: string
    slug: string | null
    title: string
  }>
  body: Array<{
    _key: string
    _type: string
    children: Array<{
      // Add properties as needed
      [key: string]: any
    }>
    markDefs: Array<any>
    style: string
  }>
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

/**
 * Returns a random post based on the current category post
 *
 * @param category - The category of the current post
 * @param currentPostSlug - The slug of the current post
 * @returns A random post from the same category
 */
export async function getRelatedPost({
  category,
  currentPostSlug,
}: {
  category: string
  currentPostSlug: string
}) {
  if (!category || !currentPostSlug) {
    throw new Error("Missing category or currentPostSlug")
  }

  const url = process.env.RELATED_POSTS_URL?.replace(
    "$category",
    category
  )?.replace("$currentPostSlug", currentPostSlug)

  console.log(category)
  console.log(currentPostSlug)

  if (!url) {
    throw new Error("Missing URL")
  }

  const res = await fetch(url)

  const posts = await res.json()

  console.log(posts.result)

  return posts.result
}
