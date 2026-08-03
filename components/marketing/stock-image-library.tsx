"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StockImageLibraryItem } from "@/sanity/lib/stock-images"

type SortOrder = "group" | "name-asc" | "name-desc" | "newest"

export function StockImageLibrary({
  images,
}: {
  images: StockImageLibraryItem[]
}) {
  const groups = useMemo(
    () =>
      [
        ...new Map(
          images.map((image) => [image.subgroup.group._id, image.subgroup.group])
        ).values(),
      ].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
    [images]
  )
  const [groupId, setGroupId] = useState("all")
  const [subgroupId, setSubgroupId] = useState("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("group")

  const subgroups = useMemo(
    () =>
      [
        ...new Map(
          images
            .filter(
              (image) =>
                groupId === "all" || image.subgroup.group._id === groupId
            )
            .map((image) => [image.subgroup._id, image.subgroup])
        ).values(),
      ].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)),
    [groupId, images]
  )

  const visibleImages = useMemo(() => {
    const filtered = images.filter(
      (image) =>
        (groupId === "all" || image.subgroup.group._id === groupId) &&
        (subgroupId === "all" || image.subgroup._id === subgroupId)
    )

    return filtered.toSorted((a, b) => {
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name)
      if (sortOrder === "name-desc") return b.name.localeCompare(a.name)
      if (sortOrder === "newest")
        return b.createdAt.localeCompare(a.createdAt)
      return (
        a.subgroup.group.order - b.subgroup.group.order ||
        a.subgroup.order - b.subgroup.order ||
        a.name.localeCompare(b.name)
      )
    })
  }, [groupId, images, sortOrder, subgroupId])

  function chooseGroup(value: string | null) {
    setGroupId(value ?? "all")
    setSubgroupId("all")
  }

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 border-b bg-background/95 px-4 py-4 backdrop-blur-sm md:-mx-8 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2">
          <Select value={groupId} onValueChange={chooseGroup}>
            <SelectTrigger aria-label="Filter by group">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">All groups</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group._id} value={group._id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={subgroupId}
            onValueChange={(value) => setSubgroupId(value ?? "all")}
          >
            <SelectTrigger aria-label="Filter by subgroup">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">All subgroups</SelectItem>
              {subgroups.map((subgroup) => (
                <SelectItem key={subgroup._id} value={subgroup._id}>
                  {subgroup.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(value) =>
              setSortOrder((value as SortOrder | null) ?? "group")
            }
          >
            <SelectTrigger aria-label="Sort images">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="group">Group order</SelectItem>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
              <SelectItem value="name-desc">Name Z–A</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
            </SelectContent>
          </Select>

          <span className="flex h-9 items-center px-2 text-sm text-muted-foreground">
            {visibleImages.length} images
          </span>
        </div>
      </div>

      {visibleImages.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleImages.map((image) => (
            <article key={image._id} className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-2 truncate text-sm font-medium">
                {image.name}
              </h2>
              <p className="truncate text-xs text-muted-foreground">
                {image.subgroup.group.name} · {image.subgroup.name}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-sm text-muted-foreground">
          No stock images match these filters.
        </p>
      )}
    </div>
  )
}
