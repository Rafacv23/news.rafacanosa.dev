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
  keywords: [
    "blog",
    "noticias",
    "tecnología",
    "programación",
    "desarrollo web",
    "videojuegos",
    "cine",
    "libros",
    "anime",
    "cultura digital",
  ],
  alternates: {
    canonical: "https://news.rafacanosa.dev",
  },
  applicationName: "news.rafacanosa.dev",
  creator: "Rafa Canosa",
  authors: [{ name: "Rafa Canosa", url: "https://rafacanosa.dev" }],
  openGraph: {
    title: "News by Rafa Canosa",
    description: "Un blog de Rafa Canosa",
    url: "https://news.rafacanosa.dev",
    siteName: "news.rafacanosa.dev",
    images: [
      {
        url: "https://news.rafacanosa.dev/favicon.ico",
        width: 1200,
        height: 630,
        alt: "news.rafacanosa.dev",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News by Rafa Canosa",
    description: "Un blog de Rafa Canosa",
    images: ["https://news.rafacanosa.dev/welcome-email.png"],
    creator: "@rafacanosa",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: [
      {
        rel: "android-chrome",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://news.rafacanosa.dev"),
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
