"use client"

import Image from "next/image"
import Link from "next/link"
import { SearchIcon, XIcon } from "lucide-react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
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

const overlayGradient =
  "linear-gradient(to bottom, var(--background) 0%, var(--background) 45%, color-mix(in oklab, var(--background) 96%, transparent) 55%, color-mix(in oklab, var(--background) 82%, transparent) 65%, color-mix(in oklab, var(--background) 50%, transparent) 78%, color-mix(in oklab, var(--background) 18%, transparent) 90%, transparent 100%)"

function displayCategory(category: string) {
  return category === "Product & Protocol" ? "Protocol" : category
}

export function LivepeerBlogIndex({ posts }: { posts: LivepeerBlogPostSummary[] }) {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const visiblePosts = useMemo(
    () => {
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
    },
    [category, posts, query]
  )

  return (
    <main className="px-4 pt-16 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="pt-12 text-center lg:pt-16">
          <h1 className="font-display text-balance text-4xl leading-[0.98] font-light tracking-[-0.045em] sm:text-5xl">
            Latest Updates
          </h1>
        </header>

        <div className="relative z-30 mt-8 flex h-11 justify-center md:hidden">
          {filtersOpen ? (
            <div className="absolute top-0 left-1/2 w-full max-w-2xl -translate-x-1/2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[100dvh] w-screen -translate-x-1/2"
                style={{ background: overlayGradient }}
              />
              <InputGroup className="h-11 rounded-sm border bg-background has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                <InputGroupAddon className="pl-0">
                  <SearchIcon className="-translate-x-px" />
                </InputGroupAddon>
                <InputGroupInput
                  autoFocus
                  type="search"
                  className="px-0"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles"
                  aria-label="Search articles"
                />
                <InputGroupAddon align="inline-end" className="pr-0">
                  <InputGroupButton
                    size="icon-xs"
                    className="justify-end text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0"
                    aria-label="Close search"
                    onClick={() => setFiltersOpen(false)}
                  >
                    <XIcon className="-translate-x-0.5" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <div
                className="mt-6 grid w-full grid-cols-3 gap-x-6 gap-y-3"
                aria-label="Blog categories"
              >
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant="ghost"
                    className={`h-auto w-full justify-start rounded-none p-0 font-medium hover:bg-transparent hover:text-foreground ${category === item ? "text-foreground" : "text-muted-foreground"}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-sm font-normal hover:bg-transparent"
              onClick={() => setFiltersOpen(true)}
            >
              <SearchIcon />
              Search articles
            </Button>
          )}
        </div>

        <div className="relative z-30 mt-8 hidden h-11 justify-center md:flex">
          {filtersOpen ? (
            <div className="absolute top-0 left-1/2 w-full max-w-2xl -translate-x-1/2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[100dvh] w-screen -translate-x-1/2"
                style={{ background: overlayGradient }}
              />
              <InputGroup className="h-11 rounded-sm border bg-background has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                <InputGroupAddon className="pl-0">
                  <SearchIcon className="-translate-x-px" />
                </InputGroupAddon>
                <InputGroupInput
                  autoFocus
                  type="search"
                  className="px-0"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles"
                  aria-label="Search articles"
                />
                <InputGroupAddon align="inline-end" className="pr-0">
                  <InputGroupButton
                    size="icon-xs"
                    className="justify-end text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0"
                    aria-label="Close search"
                    onClick={() => setFiltersOpen(false)}
                  >
                    <XIcon className="-translate-x-0.5" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <div
                className="mt-6 grid w-full grid-cols-3 gap-x-8 gap-y-3"
                aria-label="Blog categories"
              >
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant="ghost"
                    className={`h-auto w-full min-w-0 justify-start rounded-none p-0 font-medium hover:bg-transparent hover:text-foreground ${category === item ? "text-foreground" : "text-muted-foreground"}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-sm font-normal hover:bg-transparent"
              onClick={() => setFiltersOpen(true)}
            >
              <SearchIcon />
              Search articles
            </Button>
          )}
        </div>

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
