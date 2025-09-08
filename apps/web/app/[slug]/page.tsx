import { notFound } from "next/navigation"
import styles from "../page.module.css"
import { getArticleBySlug } from "../lib/post"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) return notFound()

  const article = await getArticleBySlug(slug)

  if (!article) {
    return <div>Loading...</div>
  }
  console.log(article)

  return (
    <div className={styles.page}>
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
    </div>
  )
}
