import { describe, it, expect, vi, beforeEach } from "vitest"
import * as postModule from "../app/lib/post"

describe("getArticles", () => {
  const mockArticles = {
    result: [
      {
        _id: "1",
        title: "Test Article",
        excerpt: "Excerpt",
        slug: "test-article",
        mainImage: {
          _type: "image",
          asset: { _ref: "image-ref", _type: "reference" },
        },
        publishedAt: "2025-01-01T00:00:00.000Z",
        seo: null,
        author: {
          _id: "author1",
          name: "Author",
          image: {
            _type: "image",
            asset: { _ref: "author-image-ref", _type: "reference" },
          },
        },
        categories: [{ _id: "cat1", slug: "cat-slug", title: "Category" }],
        body: [],
      },
    ],
  }

  beforeEach(() => {
    vi.resetAllMocks()
    process.env.ALL_POSTS_URL = "https://mocked-url.com/all"
  })

  it("fetches articles and returns the result", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => mockArticles,
      })
    )

    const articles = await postModule.getArticles()
    expect(articles).toEqual(mockArticles.result)
  })

  it("throws if ALL_POSTS_URL is missing", async () => {
    process.env.ALL_POSTS_URL = ""
    await expect(postModule.getArticles()).rejects.toThrow("Missing URL")
  })
})

describe("getArticleBySlug", () => {
  const mockArticle = {
    result: {
      _id: "1",
      title: "Test Article",
      excerpt: "Excerpt",
      slug: "test-article",
      mainImage: {
        _type: "image",
        asset: { _ref: "image-ref", _type: "reference" },
      },
      publishedAt: "2025-01-01T00:00:00.000Z",
      seo: null,
      author: {
        _id: "author1",
        name: "Author",
        image: {
          _type: "image",
          asset: { _ref: "author-image-ref", _type: "reference" },
        },
      },
      categories: [{ _id: "cat1", slug: "cat-slug", title: "Category" }],
      body: [],
    },
  }

  beforeEach(() => {
    vi.resetAllMocks()
    process.env.SINGLE_POST_URL =
      "https://mocked-url.com/hollow-knight-silksong-y-el-fomo"
  })

  it("fetches article by slug and returns the result", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => mockArticle,
      })
    )

    const article = await postModule.getArticleBySlug("test-article")
    expect(article).toEqual(mockArticle.result)
  })

  it("returns null if slug is missing", async () => {
    const article = await postModule.getArticleBySlug("")
    expect(article).toBeNull()
  })

  it("throws if SINGLE_POST_URL is missing", async () => {
    process.env.SINGLE_POST_URL = ""
    await expect(postModule.getArticleBySlug("test-article")).rejects.toThrow(
      "Missing URL"
    )
  })
})
