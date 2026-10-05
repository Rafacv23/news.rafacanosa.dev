import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { CATEGORY_SLUGS } from "./lib/site"

const articulos = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/articulos", generateId: ({ entry }) => entry.split("/")[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      category: z.enum(CATEGORY_SLUGS),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { articulos }
