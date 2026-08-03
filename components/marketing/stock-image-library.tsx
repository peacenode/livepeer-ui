"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import { useMasonryCorners } from "@/components/livepeer-ui/use-masonry-corners"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { StockImageLibraryItem } from "@/sanity/lib/stock-images"

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
  const { containerRef, cornerStyles } = useMasonryCorners()

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

  const visibleImages = useMemo(
    () =>
      images
        .filter(
          (image) =>
            (groupId === "all" || image.subgroup.group._id === groupId) &&
            (subgroupId === "all" || image.subgroup._id === subgroupId)
        )
        .toSorted(
          (a, b) =>
            a.subgroup.group.order - b.subgroup.group.order ||
            a.subgroup.order - b.subgroup.order ||
            a.name.localeCompare(b.name)
        ),
    [groupId, images, subgroupId]
  )

  function chooseGroup(value: string | null) {
    setGroupId(value ?? "all")
    setSubgroupId("all")
  }

  return (
    <div>
      <div className="pb-5">
        <div className="mx-auto w-full max-w-6xl overflow-x-auto">
          <Tabs value={groupId} onValueChange={chooseGroup}>
            <TabsList variant="line">
              <TabsTrigger value="all">All</TabsTrigger>
              {groups.map((group) => (
                <TabsTrigger key={group._id} value={group._id}>
                  {group.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div
          className="mx-auto mt-4 flex w-full max-w-6xl flex-wrap gap-2"
          aria-label="Filter by subgroup"
        >
          <Badge
            variant={subgroupId === "all" ? "default" : "secondary"}
            className="h-8 rounded-sm px-3 font-normal"
            render={
              <button type="button" onClick={() => setSubgroupId("all")} />
            }
          >
            All
          </Badge>
          {subgroups.map((subgroup) => (
            <Badge
              key={subgroup._id}
              variant={subgroupId === subgroup._id ? "default" : "secondary"}
              className="h-8 rounded-sm px-3 font-normal"
              render={
                <button
                  type="button"
                  onClick={() => setSubgroupId(subgroup._id)}
                />
              }
            >
              {subgroup.name}
            </Badge>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-1 columns-1 gap-1 sm:columns-2 lg:columns-3 xl:columns-4"
      >
        {visibleImages.map((image) => (
          <div
            key={image._id}
            data-masonry-item={image._id}
            className="relative mb-1 block w-full break-inside-avoid overflow-hidden rounded-sm bg-muted"
            style={cornerStyles[image._id]}
          >
            <Image
              src={image.url}
              alt=""
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
