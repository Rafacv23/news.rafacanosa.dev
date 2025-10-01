import Link from "next/link"
import { getRelatedPost } from "../../lib/post"

export default async function RelatedPost({
  category,
  currentPostSlug,
}: {
  category: string
  currentPostSlug: string
}) {
  if (!category || !currentPostSlug) {
    return null
  }
  const relatedPost = await getRelatedPost({
    category,
    currentPostSlug,
  })

  return (
    <Link href={`/${relatedPost.slug}`} title={relatedPost.title}>
      {relatedPost.title}
    </Link>
  )
}
