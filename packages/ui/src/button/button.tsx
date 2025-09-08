"use client"

import { ReactNode } from "react"
import styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline"
}

export const Button = ({
  children,
  className,
  variant = "default",
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`}>
      {children}
    </button>
  )
}
