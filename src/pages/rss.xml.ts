import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getPosts } from "../lib/content"
import { CATEGORIES, SITE } from "../lib/site"

export async function GET(context: APIContext) {
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    customData: "<language>es-es</language>",
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/${post.id}`,
      categories: [CATEGORIES[post.data.category].label, ...post.data.tags],
    })),
  })
}
