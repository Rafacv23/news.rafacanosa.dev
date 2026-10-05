// @ts-check
import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://blog.rafacanosa.dev",
  output: "static",
  trailingSlash: "never",
  // El modo "jsx" de Astro 7 se come los espacios entre elementos en línea.
  compressHTML: true,
  // Sin sesiones ni cookies no hay CSRF que evitar, y Gmail/Yahoo hacen POST sin cabecera Origin
  // al darse de baja con un clic (List-Unsubscribe-Post).
  security: { checkOrigin: false },
  adapter: vercel({ webAnalytics: { enabled: true } }),
  integrations: [
    sitemap({ filter: (page) => !page.includes("/newsletter/") }),
  ],
})
