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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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

        <div className="mt-8 flex justify-center md:hidden">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="rounded-sm font-normal"
              onClick={() => setFiltersOpen(true)}
            >
              <SearchIcon />
              Search articles
            </Button>
            <SheetContent
              side="bottom"
              className="max-h-[85dvh] rounded-t-lg"
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="font-display text-xl font-light">
                  Search articles
                </SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <InputGroup className="h-11 rounded-sm border bg-background">
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search articles"
                    aria-label="Search articles"
                  />
                </InputGroup>

                <div
                  className="mt-4 grid grid-cols-2 gap-2"
                  aria-label="Blog categories"
                >
                  {categories.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      variant={category === item ? "default" : "secondary"}
                      className="justify-start rounded-sm font-normal"
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-8 hidden justify-center md:flex">
          {filtersOpen ? (
            <div className="w-full max-w-2xl rounded-sm bg-muted p-2">
              <InputGroup className="h-11 rounded-sm border bg-background">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles"
                  aria-label="Search articles"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    aria-label="Close search"
                    onClick={() => {
                      setQuery("")
                      setCategory("All")
                      setFiltersOpen(false)
                    }}
                  >
                    <XIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <div
                className="mt-2 flex flex-wrap gap-1"
                aria-label="Blog categories"
              >
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant={category === item ? "default" : "ghost"}
                    className="rounded-sm font-normal"
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
              variant="secondary"
              size="lg"
              className="rounded-sm font-normal"
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
