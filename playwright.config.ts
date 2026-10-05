import { defineConfig } from "@playwright/test"

// Prueba el build real (estático + índice de Pagefind). Las rutas de servidor
// (newsletter) se cubren con los tests unitarios y se mockean aquí.
export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:4321" },
  webServer: {
    command: "pnpm build && pnpm dlx serve@14 .vercel/output/static -l 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
