import type { MetadataRoute } from "next"
import { getArticles } from "./lib/post"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()

  const baseUrl = "https://news.rafacanosa.dev"

  const articleUrls = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: `${baseUrl}/${article.slug}`,
      lastModified: article.publishedAt
        ? new Date(article.publishedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    ...articleUrls,
  ]
}
