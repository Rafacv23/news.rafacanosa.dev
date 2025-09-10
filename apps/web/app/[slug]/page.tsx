import { notFound } from "next/navigation"
import styles from "./page.module.css"
import { getArticleBySlug } from "../lib/post"
import { buildSanityImgUrl } from "../lib/utils"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Newsletter from "../components/newsletter/newsletter"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)
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

function Skeleton() {
  return (
    <div className={styles.page}>
      <main>
        <div
          className={styles.img}
          style={{
            background: "var(--card)",
            height: 320,
            borderRadius: 8,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            height: 40,
            width: "70%",
            background: "var(--card)",
            borderRadius: 6,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            height: 24,
            width: "50%",
            background: "var(--card)",
            borderRadius: 6,
            marginBottom: 32,
          }}
        />
        <div className={styles.prose}>
          <div
            style={{
              height: 16,
              width: "100%",
              background: "var(--card)",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              height: 16,
              width: "90%",
              background: "var(--card)",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              height: 16,
              width: "95%",
              background: "var(--card)",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              height: 16,
              width: "80%",
              background: "var(--card)",
              borderRadius: 4,
              marginBottom: 24,
            }}
          />
        </div>
      </main>
    </div>
  )
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
    return <Skeleton />
  }

  return (
    <div className={styles.page}>
      <main>
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
        <Newsletter />
        <section className={styles.nav}>
          <Link href="/" title="Inicio" className={styles.back}>
            <ArrowLeft size={16} /> Volver
          </Link>
          {/* <Link href="/blog/page/2" title="Siguiente" className={styles.back}>
            Otro artículo
            <ArrowRight size={16} />
          </Link> */}
        </section>
      </main>
    </div>
  )
}
