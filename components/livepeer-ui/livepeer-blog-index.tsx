"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { FilterSearch } from "@/components/livepeer-ui/filter-search"
import { DisplayHeading } from "@/components/ui/display-heading"
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
      const matchesCategory =
        category === "All" || displayCategory(post.category) === category
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

        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
              <h2 className="font-display text-xl font-light tracking-tight text-balance">
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
