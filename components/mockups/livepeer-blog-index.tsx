"use client"

import Image from "next/image"
import Link from "next/link"
import { SearchIcon, XIcon } from "lucide-react"
import { LayoutGroup, motion, MotionConfig } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { flushSync } from "react-dom"

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

const searchLayoutTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 42,
  mass: 0.7,
}

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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [inputReady, setInputReady] = useState(false)
  const [sharedLayoutEnabled, setSharedLayoutEnabled] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    if (!filtersOpen || inputReady) return

    const timeout = window.setTimeout(() => {
      setInputReady(true)
      searchInputRef.current?.focus()
    }, 340)

    return () => window.clearTimeout(timeout)
  }, [filtersOpen, inputReady])

  function openFilters() {
    flushSync(() => {
      setSharedLayoutEnabled(true)
    })
    setInputReady(false)
    window.requestAnimationFrame(() => setFiltersOpen(true))
  }

  function closeFilters() {
    flushSync(() => {
      setSharedLayoutEnabled(false)
    })
    setInputReady(false)
    setFiltersOpen(false)
  }

  return (
    <main className="px-4 pt-16 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="pt-12 text-center lg:pt-16">
          <h1 className="font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
            Latest Updates
          </h1>
        </header>

        <MotionConfig reducedMotion="user">
          <LayoutGroup id="blog-search">
            <div className="relative z-30 mt-8 flex h-11 justify-center">
              {filtersOpen ? (
                <motion.div
                  key="expanded"
                  className="absolute top-0 left-1/2 w-full max-w-2xl -translate-x-1/2"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[100dvh] w-screen -translate-x-1/2"
                    style={{ background: overlayGradient }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.16 }}
                  >
                    <InputGroup className="h-11 rounded-sm border bg-background has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                        <InputGroupInput
                          ref={searchInputRef}
                          type="text"
                          inputMode="search"
                          enterKeyHint="search"
                        className={`pr-0 pl-[22px] text-sm ${inputReady ? "caret-foreground" : "caret-transparent"}`}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder=""
                        aria-label="Search articles"
                      />
                      <InputGroupAddon align="inline-end" className="pr-0">
                        <InputGroupButton
                          size="icon-xs"
                          className="justify-end text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:ring-0"
                          aria-label="Close search"
                          onClick={closeFilters}
                        >
                          <XIcon className="-translate-x-0.5" />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </motion.div>

                  <motion.div
                    layoutId={
                      sharedLayoutEnabled ? "blog-search-prompt" : undefined
                    }
                    className="pointer-events-none absolute inset-y-auto top-0 left-0 z-10 flex h-11 items-center gap-1.5 text-sm text-muted-foreground"
                    transition={searchLayoutTransition}
                  >
                      <SearchIcon className="size-4" />
                      {query.length === 0 && (
                        <span>Search articles</span>
                      )}
                  </motion.div>

                  <motion.div
                    className="mt-6 grid w-full grid-cols-3 gap-x-6 gap-y-3 md:gap-x-8"
                    aria-label="Blog categories"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.06 }}
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
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="trigger">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    className="h-11 rounded-sm font-normal hover:bg-transparent"
                    onClick={openFilters}
                  >
                    <motion.span
                      layoutId={
                        sharedLayoutEnabled ? "blog-search-prompt" : undefined
                      }
                      className="inline-flex items-center gap-1.5"
                      transition={searchLayoutTransition}
                    >
                      <SearchIcon className="size-4" />
                      <span>Search articles</span>
                    </motion.span>
                  </Button>
                </motion.div>
              )}
            </div>
          </LayoutGroup>
        </MotionConfig>

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
