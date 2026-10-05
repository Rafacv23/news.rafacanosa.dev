# blog.rafacanosa.dev

Blog personal hecho con [Astro](https://astro.build). Los artículos son ficheros Markdown; la web se genera estática en cada build y solo la newsletter corre en el servidor (Vercel + Turso + Resend).

## Escribir un artículo

Crea `src/content/articulos/<slug>/index.md` (el nombre de la carpeta es la URL) y deja las imágenes en la misma carpeta:

```md
---
title: "Título del artículo"
description: "Resumen de 1-2 frases (máx. 200 caracteres). Se usa en tarjetas, buscadores y redes."
publishedAt: 2026-10-05
updatedAt: 2026-10-10        # opcional
category: videojuegos         # videojuegos | libros | cine | tecnologia | anime
tags: [rpg, early-access]     # opcional, mejora los artículos relacionados
cover: ./cover.webp
coverAlt: "Descripción de la imagen"
draft: true                   # opcional: se ve en `pnpm dev`, no se publica
---

## Primer apartado
```

- Usa `##` y `###` para los apartados: forman el índice lateral.
- Para un vídeo de YouTube pega el `<iframe>` tal cual en el Markdown.
- Una categoría nueva aparece sola (home, `/categoria/...`, sitemap) en cuanto tiene un artículo. Para añadir una que no está en la lista, edítala en `src/lib/site.ts`.

Al publicar, avisa a los suscriptores (lo pruebas antes con `--dry-run`):

```sh
pnpm newsletter:send <slug> --dry-run
pnpm newsletter:send <slug>
```

## Desarrollo

```sh
cp .env.example .env   # y rellena las variables
pnpm install
pnpm dev               # http://localhost:4321 (el buscador solo funciona tras `pnpm build`)
pnpm test              # tests unitarios (Vitest)
pnpm test:e2e          # smoke tests sobre el build real (Playwright)
pnpm check             # tipos
```

Base de datos: cambia `src/db/schema.ts`, luego `pnpm db:generate` y `pnpm db:migrate` (usa las variables de `.env`).
