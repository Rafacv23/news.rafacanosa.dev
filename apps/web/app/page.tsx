import { Card, MainCard } from "./components/card/card"
import Footer from "./components/footer"
import Header from "./components/header"
import { Article, getArticles } from "./lib/post"
import styles from "./page.module.css"

export default async function Home() {
  const articles = await getArticles()
  const firstArticle = articles[0]

  const otherArticles = articles.slice(1)

  if (!articles) {
    return <div>Loading...</div>
  }

  if (!firstArticle) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <MainCard
          className={styles.card}
          title={firstArticle.title}
          excerpt={firstArticle.excerpt}
          img={firstArticle.img || ""}
          href={firstArticle.slug}
        />
        <ul className={styles.articlesList}>
          {otherArticles.map((article: Article) => (
            <li key={article._id} className={styles.card}>
              <Card
                title={article.title}
                excerpt={article.excerpt}
                href={article.slug}
              />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
