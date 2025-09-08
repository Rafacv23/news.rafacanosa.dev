import { notFound } from "next/navigation"
import styles from "./page.module.css"
import { getArticleBySlug } from "../lib/post"
import { buildSanityImgUrl } from "../lib/utils"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { ArrowLeft } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params

  const article = await getArticleBySlug(params.slug)
  if (!article) return {}

  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription || "Detalle del artículo",
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription || "Detalle del artículo",
      images: article.seo?.metaImage
        ? [
            {
              url: buildSanityImgUrl(article.seo.metaImage.asset._ref),
              width: 800,
              height: 600,
              alt: article.seo.metaTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.metaTitle,
      description: article.seo.metaDescription || "Detalle del artículo",
      images: article.seo?.metaImage
        ? [buildSanityImgUrl(article.seo.metaImage.asset._ref)]
        : [],
    },
  }
}

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
        <div className={styles.prose}>
          <PortableText value={article.body} />
        </div>
        <footer className={styles.footer}>
          {article.author.name} |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </footer>
      </main>
    </div>
  )
}
