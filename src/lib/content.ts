import { getCollection } from "astro:content"
import { sortPosts } from "./posts"

/** Artículos publicados, del más reciente al más antiguo. En `pnpm dev` incluye borradores. */
export async function getPosts() {
  return sortPosts(await getCollection("articulos"), import.meta.env.DEV)
}
