import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "News by Rafa Canosa",
  description: "Un blog de Rafa Canosa",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem={true}
          value={{ light: "light", dark: "dark" }}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
