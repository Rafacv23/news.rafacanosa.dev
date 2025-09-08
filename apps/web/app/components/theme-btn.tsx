"use client"

import { SunMoon } from "lucide-react"
import { Button } from "./button/button"
import { useTheme } from "next-themes"

export default function ThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="outline"
    >
      <SunMoon size={24} />
    </Button>
  )
}
