"use client"

import * as React from "react"

type UseProgressiveListOptions<T> = {
  items: T[]
  pageSize?: number
  rootMargin?: string
}

export function useProgressiveList<T>({
  items,
  pageSize = 20,
  rootMargin = "240px 0px",
}: UseProgressiveListOptions<T>) {
  const [visibleCount, setVisibleCount] = React.useState(() =>
    Math.min(pageSize, items.length)
  )
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const hasMore = visibleCount < items.length

  const loadMore = React.useCallback(() => {
    setVisibleCount((count) => Math.min(count + pageSize, items.length))
  }, [items.length, pageSize])

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { rootMargin }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loadMore, rootMargin])

  return {
    visibleItems: items.slice(0, visibleCount),
    visibleCount: Math.min(visibleCount, items.length),
    totalCount: items.length,
    hasMore,
    loadMore,
    sentinelRef,
  }
}
