import styles from "./header.module.css"
import ThemeBtn from "../theme-btn"

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>news.rafacanosa.dev</h1>
      <nav className={styles.navLinks}>
        <ThemeBtn />
      </nav>
    </header>
  )
}
