import { type JSX } from "react"
import styles from "./card.module.css"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

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
    <Link className={`${styles.card} ${className}`} href={`${href}`}>
      <h2 className={styles.title}>
        {title}{" "}
        <span>
          <ArrowUpRight size={16} />
        </span>
      </h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </Link>
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
    <Link className={`${styles.card} ${className}`} href={`${href}`}>
      <img src={img} alt={title} className={styles.img} />
      <h2 className={styles.title}>
        {title}{" "}
        <span>
          <ArrowUpRight size={16} />
        </span>
      </h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </Link>
  )
}
