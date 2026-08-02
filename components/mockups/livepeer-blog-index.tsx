"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { ChunkyTabs } from "@/components/ui/chunky-tabs"
import type { LivepeerBlogPostSummary } from "@/sanity/lib/livepeer-blog"

const categories = [
  "All",
  "Protocol",
  "Ecosystem",
  "Network",
  "Community",
  "News",
  "Governance",
]

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function displayCategory(category: string) {
  return category === "Product & Protocol" ? "Protocol" : category
}

export function LivepeerBlogIndex({ posts }: { posts: LivepeerBlogPostSummary[] }) {
  const [category, setCategory] = useState("All")
  const visiblePosts = useMemo(
    () =>
      category === "All"
        ? posts
        : posts.filter((post) => displayCategory(post.category) === category),
    [category, posts]
  )

  return (
    <main className="px-4 pt-28 pb-24 sm:px-6 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h1 className="font-display text-balance text-4xl leading-[0.98] font-light tracking-[-0.045em] sm:text-5xl">
            Latest Updates
          </h1>
        </header>

        <ChunkyTabs
          items={categories}
          value={category}
          onValueChange={setCategory}
          ariaLabel="Blog categories"
          className="mt-8"
        />

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <Link
              key={post._id}
              href={`/mockups/livepeer-org/blog/${post.slug}`}
              className="group flex min-w-0 flex-col gap-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm border bg-muted">
                <Image
                  src={post.heroImageUrl}
                  alt={post.heroImageAlt || ""}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <h2 className="font-display text-balance text-xl font-light tracking-tight">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 pl-[1px]">
                <span className="text-xs text-foreground">
                  {displayCategory(post.category)}
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="text-xs text-muted-foreground"
                >
                  {dateFormatter.format(new Date(post.publishedAt))}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
