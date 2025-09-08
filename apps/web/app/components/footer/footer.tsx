import Link from "next/link"
import styles from "./footer.module.css"
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link
        href="https://www.rafacanosa.dev"
        target="_blank"
        title="Mi web personal"
      >
        <Linkedin />
      </Link>
      Rafa Canosa
      <Link
        href="https://github.com/rafacv23"
        target="_blank"
        rel="noopener"
        title="GitHub"
      >
        <Github />
      </Link>
    </footer>
  )
}
