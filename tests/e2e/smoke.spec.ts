import { expect, test } from "@playwright/test"

const SLUG = "hytale-early-access-2026-8-anos-de-desarrollo-y-la-verdad-del-early-access"

test("home: destacado, últimas entradas y navegación a un artículo", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle("Blog de Rafa Canosa")
  await expect(page.getByRole("heading", { name: "Últimas entradas" })).toBeVisible()
  await page.getByRole("link", { name: /Hytale/ }).first().click()
  await expect(page).toHaveURL(`/${SLUG}`)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hytale")
})

test("artículo: índice, barra de progreso, Ko-fi y relacionados", async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 })
  await page.goto(`/${SLUG}`)
  const toc = page.getByRole("navigation", { name: "Índice del artículo" })
  await expect(toc).toBeVisible()

  const progress = () => page.locator(".progress").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a)
  expect(await progress()).toBe(0)
  await page.getByRole("heading", { name: "El Lado Oscuro" }).scrollIntoViewIfNeeded()
  await expect.poll(progress).toBeGreaterThan(0.2)
  await expect(toc.locator("a[aria-current]")).toHaveCount(1)

  await expect(page.locator(".kofi").getByRole("link")).toHaveAttribute("href", "https://ko-fi.com/rafacanosa")
  const related = page.getByRole("region", { name: "Te puede interesar" })
  await expect(related.getByRole("listitem")).toHaveCount(4)
  await expect(related.getByRole("link", { name: /Hytale/ })).toHaveCount(0)
})

test("buscador: ⌘K/Ctrl+K abre el diálogo y encuentra artículos por su contenido", async ({ page }) => {
  await page.goto("/")
  await page.keyboard.press("ControlOrMeta+k")
  const dialog = page.getByRole("dialog", { name: "Buscar artículos" })
  await expect(dialog).toBeVisible()
  await page.keyboard.type("Silksong")
  await expect(dialog.getByRole("link", { name: /^¿Vale la pena Hollow Knight Silksong/ })).toBeVisible()
  await page.keyboard.type(" xyzxyz")
  await expect(dialog.getByText(/Sin resultados/)).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
})

test("tema oscuro se guarda entre páginas", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/")
  await page.getByRole("button", { name: "Cambiar tema claro/oscuro" }).click()
  await page.goto("/articulos")
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
})

test("newsletter muestra la respuesta del servidor", async ({ page }) => {
  await page.route("/api/newsletter", (route) =>
    route.fulfill({ json: { ok: true, message: "¡Casi está! Revisa tu email y confirma la suscripción." } }),
  )
  await page.goto("/")
  await page.getByLabel("Tu email").fill("ana@example.com")
  await page.getByRole("button", { name: "Suscribirme" }).click()
  await expect(page.getByRole("status")).toHaveText(/Revisa tu email/)
  await expect(page.getByLabel("Tu email")).toHaveValue("")
})

test("listados paginados y categoría", async ({ page }) => {
  await page.goto("/articulos")
  await expect(page.locator("main li")).toHaveCount(5)
  await page.goto("/categoria/videojuegos")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Videojuegos")
  expect((await page.request.get("/categoria/libros")).status()).toBe(404)
})

test("SEO: canonical, OG, JSON-LD, sitemap, RSS y robots", async ({ page, request }) => {
  await page.goto(`/${SLUG}`)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://blog.rafacanosa.dev/${SLUG}`)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\/blog\.rafacanosa\.dev\/_astro\/.+\.jpg$/)
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(ld[0]).toMatchObject({ "@type": "BlogPosting", headline: expect.stringContaining("Hytale") })

  expect(await (await request.get("/sitemap-0.xml")).text()).toContain(`https://blog.rafacanosa.dev/${SLUG}`)
  expect(await (await request.get("/rss.xml")).text()).toContain(`https://blog.rafacanosa.dev/${SLUG}`)
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://blog.rafacanosa.dev/sitemap-index.xml")
})

test("404 propia", async ({ page }) => {
  const res = await page.goto("/esto-no-existe")
  expect(res!.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("404")
})
