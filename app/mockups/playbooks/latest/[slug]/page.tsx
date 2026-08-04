import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getLivepeerBlogPost } from "@/sanity/lib/livepeer-blog"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getLivepeerBlogPost(slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function LivepeerLatestPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getLivepeerBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="px-4 pt-28 pb-24 sm:px-6 lg:pt-36">
      <article className="mx-auto max-w-[680px]">
        <header className="mb-12">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/mockups/livepeer-org/latest"
              className="transition-colors hover:text-foreground"
            >
              Latest Updates
            </Link>
            <span aria-hidden>›</span>
            <span>{post.category}</span>
          </div>
          <h1 className="font-display text-balance text-3xl font-light tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.author && <span>{post.author}</span>}
            {post.author && <span aria-hidden>·</span>}
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm border bg-muted">
            <Image
              src={post.heroImageUrl}
              alt={post.heroImageAlt || ""}
              fill
              priority
              sizes="680px"
              className="object-cover"
            />
          </div>
        </header>

        <div
          className="livepeer-blog-prose"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        <div className="mt-16 border-t pt-10 text-center">
          <Link
            href="/mockups/livepeer-org/latest"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← All posts
          </Link>
        </div>
      </article>
    </main>
  )
}
