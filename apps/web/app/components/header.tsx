import { Button } from "@repo/ui/button/button"
import { SunMoon } from "lucide-react"
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>news.rafacanosa.dev</h1>
      <nav className={styles.navLinks}>
        <Button variant="outline">
          <SunMoon size={24} />
        </Button>
      </nav>
    </header>
  )
}
