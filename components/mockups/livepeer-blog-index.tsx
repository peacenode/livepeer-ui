"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import type { LivepeerBlogPostSummary } from "@/sanity/lib/livepeer-blog"
import { cn } from "@/lib/utils"

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
        <header className="max-w-2xl">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Latest Updates
          </h1>
          <p className="mt-5 text-balance text-lg text-muted-foreground">
            News, insights, and updates from across the Livepeer ecosystem.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2" aria-label="Blog categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                category === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <Link
              key={post._id}
              href={`/mockups/livepeer-org/blog/${post.slug}`}
              className="group min-w-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={post.heroImageUrl}
                  alt={post.heroImageAlt || ""}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <h2 className="mt-3 font-display text-balance text-xl font-light tracking-tight">
                {post.title}
              </h2>
              <div className="mt-3 flex items-center gap-2">
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
