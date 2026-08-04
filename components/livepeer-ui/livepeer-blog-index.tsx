"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { FilterSearch } from "@/components/livepeer-ui/filter-search"
import { DisplayHeading } from "@/components/ui/display-heading"
import type { LivepeerBlogPostSummary } from "@/sanity/lib/livepeer-blog"

const categories = [
  "All",
  "Network",
  "Agent",
  "Community",
  "Proposals",
  "Engineering",
]

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

export function LivepeerBlogIndex({
  posts,
}: {
  posts: LivepeerBlogPostSummary[]
}) {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [post.title, post.description, post.author, post.category].some(
          (value) => value?.toLowerCase().includes(normalizedQuery)
        )
      return matchesCategory && matchesQuery
    })
  }, [category, posts, query])

  return (
    <main className="px-4 pt-16 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="pt-12 text-center lg:pt-16">
          <DisplayHeading>Latest Updates</DisplayHeading>
        </header>

        <FilterSearch
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
          placeholder="Search articles"
          searchLabel="Search articles"
          categoriesLabel="Blog categories"
          className="mt-8"
          categoryGridClassName="grid-cols-3"
        />

        <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <Link
              key={post._id}
              href={`/mockups/livepeer-org/latest/${post.slug}`}
              className="group flex min-w-0 flex-col gap-2"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm border bg-muted">
                <Image
                  src={post.heroImageUrl}
                  alt={post.heroImageAlt || ""}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <h2 className="font-display text-xl leading-snug font-light tracking-tight text-pretty">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 overflow-hidden pl-[1px] whitespace-nowrap">
                <span className="shrink-0 text-xs text-foreground">
                  {post.category}
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="min-w-0 truncate text-xs text-muted-foreground"
                >
                  {dateFormatter.format(new Date(post.publishedAt))}
                </time>
              </div>
            </Link>
          ))}
          {visiblePosts.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No articles found.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
