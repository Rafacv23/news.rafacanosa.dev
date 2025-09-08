import { type JSX } from "react"
import styles from "./card.module.css"
import { ArrowUpRight } from "lucide-react"

export function Card({
  className,
  title,
  excerpt,
  href,
}: {
  className?: string
  title: string
  excerpt: string
  href: string
}): JSX.Element {
  return (
    <a
      className={`${styles.card} ${className}`}
      href={`${href}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className={styles.title}>
        {title}{" "}
        <span>
          <ArrowUpRight size={16} />
        </span>
      </h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </a>
  )
}

export function MainCard({
  className,
  title,
  excerpt,
  img,
  href,
}: {
  className?: string
  title: string
  excerpt: string
  img: string
  href: string
}): JSX.Element {
  return (
    <a
      className={`${styles.card} ${className}`}
      href={`${href}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img src={img} alt={title} className={styles.img} />
      <h2 className={styles.title}>
        {title}{" "}
        <span>
          <ArrowUpRight size={16} />
        </span>
      </h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </a>
  )
}
