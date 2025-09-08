import { notFound } from "next/navigation"
import styles from "./page.module.css"
import { getArticleBySlug } from "../lib/post"
import { buildSanityImgUrl } from "../lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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

  return (
    <div className={styles.page}>
      <main>
        <Link href="/" title="Home" className={styles.back}>
          <ArrowLeft size={16} /> Volver
        </Link>
        <img
          src={buildSanityImgUrl(article.mainImage.asset._ref)}
          alt={article.title}
          className={styles.img}
        />
        <h1 className={styles.title}>{article.title}</h1>
        <h2 className={styles.excerpt}>{article.excerpt}</h2>
        <p className={styles.body}>
          {article.body.map((block) => {
            return (
              <p key={block._key}>
                {block.children.map((child) => child.text).join("")}
              </p>
            )
          })}
        </p>
        <footer className={styles.footer}>
          {article.author.name} |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </footer>
      </main>
    </div>
  )
}
