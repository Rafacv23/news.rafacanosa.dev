export const SITE = {
  name: "Blog de Rafa Canosa",
  description:
    "Opiniones y noticias sobre videojuegos, libros, cine y cultura digital, por Rafa Canosa.",
  url: "https://blog.rafacanosa.dev",
  author: "Rafa Canosa",
  authorUrl: "https://www.rafacanosa.dev",
  kofi: "https://ko-fi.com/rafacanosa",
  github: "https://github.com/rafacv23",
  contactEmail: "rafatriedcoding@gmail.com",
  postsPerPage: 12,
}

// Cada categoría aparece en la web en cuanto tiene algún artículo publicado.
// `colors` es el degradado de la barra de progreso de lectura.
export const CATEGORIES = {
  videojuegos: { label: "Videojuegos", colors: ["#7c3aed", "#ec4899"] },
  libros: { label: "Libros", colors: ["#d97706", "#f43f5e"] },
  cine: { label: "Cine", colors: ["#0ea5e9", "#6366f1"] },
  tecnologia: { label: "Tecnología", colors: ["#10b981", "#0ea5e9"] },
  anime: { label: "Anime", colors: ["#f43f5e", "#f59e0b"] },
} as const

export type Category = keyof typeof CATEGORIES
export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as [Category, ...Category[]]
