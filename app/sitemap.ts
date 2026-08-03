import type { MetadataRoute } from "next"
import { getAllPages } from "@/sanity/lib/page/getAllPages"
import { getAllPosts } from "@/sanity/lib/blog/getAllPosts"

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://janwalenda.de"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([
    getAllPages(),
    getAllPosts("desc"),
  ])

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug?.current && page.slug.current !== "home")
    .map((page) => ({
      url: `${SITE_URL}/${page.slug!.current}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: page.slug!.current === "blog" ? 0.9 : 0.7,
    }))

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug!.current}`,
      lastModified: post._updatedAt
        ? new Date(post._updatedAt)
        : post.publishedAt
          ? new Date(post.publishedAt)
          : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageEntries,
    ...postEntries,
  ]
}
