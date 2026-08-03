import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type LivepeerBlogPostSummary = {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  author?: string
  publishedAt: string
  readingTime: number
  heroImageUrl: string
  heroImageAlt?: string
}

export type LivepeerBlogPost = LivepeerBlogPostSummary & {
  bodyHtml: string
  sourceUrl: string
}

const summariesQuery = defineQuery(`
  *[_type == "livepeerBlogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    author,
    publishedAt,
    readingTime,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt
  }
`)

const postQuery = defineQuery(`
  *[_type == "livepeerBlogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    author,
    publishedAt,
    readingTime,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    bodyHtml,
    sourceUrl
  }
`)

const options = { next: { revalidate: 60, tags: ["livepeer-blog"] } }

export function getLivepeerBlogPosts() {
  return sanityClient.fetch<LivepeerBlogPostSummary[]>(summariesQuery, {}, options)
}

export function getLivepeerBlogPost(slug: string) {
  return sanityClient.fetch<LivepeerBlogPost | null>(postQuery, { slug }, options)
}
