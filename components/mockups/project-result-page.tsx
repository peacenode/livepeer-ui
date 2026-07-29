"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CornerDownLeftIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMasonryCorners } from "@/components/mockups/use-masonry-corners"

type ProjectAsset = {
  id: string
  type: "image" | "video"
  src: string
  alt: string
  width: number
  height: number
  capability: string
}

function AssetMedia({
  asset,
  detail = false,
}: {
  asset: ProjectAsset
  detail?: boolean
}) {
  if (asset.type === "video") {
    return (
      <video
        src={asset.src}
        className={
          detail
            ? "h-full w-full object-contain"
            : "h-auto w-full object-cover"
        }
        controls={detail}
        autoPlay={detail}
        loop
        muted
        playsInline
      />
    )
  }

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={
        detail
          ? "100vw"
          : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
      }
      className={
        detail
          ? "h-full w-full object-contain"
          : "h-auto w-full object-cover"
      }
    />
  )
}

export function ProjectResultPage({
  assets,
  projectName,
}: {
  assets: ProjectAsset[]
  projectName: string
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { containerRef, cornerStyles } = useMasonryCorners()
  const capabilities = useMemo(
    () => [...new Set(assets.map((asset) => asset.capability))],
    [assets]
  )
  const selectedAsset =
    selectedIndex === null ? null : assets[selectedIndex] ?? null

  const selectOffset = useCallback((offset: number) => {
    setSelectedIndex((current) => {
      if (current === null || assets.length === 0) return current
      return (current + offset + assets.length) % assets.length
    })
  }, [assets.length])

  useEffect(() => {
    if (selectedIndex === null) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") selectOffset(-1)
      if (event.key === "ArrowRight") selectOffset(1)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, selectOffset])

  return (
    <section className="-mx-4 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 pb-12 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
      <div className="mx-auto w-full max-w-6xl md:pt-6">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-sans text-[2rem] leading-[0.98] font-light tracking-[-0.025em] text-balance">
              {projectName}
            </h1>
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Capabilities"
            >
              {capabilities.map((capability) => (
                <Badge
                  key={capability}
                  variant="secondary"
                  className="rounded-sm px-3 py-2 font-normal"
                >
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <div
          ref={containerRef}
          className="columns-1 gap-1 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          {assets.map((asset, index) => (
            <button
              key={asset.id}
              data-masonry-item={asset.id}
              type="button"
              className="group mb-1 block w-full break-inside-avoid overflow-hidden rounded-sm bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={cornerStyles[asset.id]}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View asset ${index + 1} of ${assets.length}`}
            >
              <span className="block transition-opacity group-hover:opacity-90">
                <AssetMedia asset={asset} />
              </span>
            </button>
          ))}
        </div>

        <form
          className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="revision-request" className="sr-only">
            Revision request
          </label>
          <input
            id="revision-request"
            type="text"
            placeholder="Describe a revision"
            className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
          <Button type="submit" className="sm:self-start">
            Send revision
            <CornerDownLeftIcon data-icon="inline-end" />
          </Button>
        </form>
      </div>

      <Dialog
        open={selectedAsset !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null)
        }}
      >
        <DialogContent
          className="h-[min(50rem,calc(100dvh-2rem))] overflow-hidden rounded-lg p-0 sm:max-w-6xl"
        >
          {selectedAsset && (
            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_18rem] md:grid-rows-1">
              <div className="flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden bg-background">
                <AssetMedia asset={selectedAsset} detail />
              </div>
              <aside className="flex min-h-0 flex-col border-t bg-background p-5 md:border-t-0 md:border-l">
                <div className="pr-8">
                  <p className="text-xs text-muted-foreground">
                    Asset {(selectedIndex ?? 0) + 1} of {assets.length}
                  </p>
                  <DialogTitle className="mt-1 font-sans text-lg font-medium">
                    Asset details
                  </DialogTitle>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 text-sm md:grid-cols-1">
                  <div>
                    <dt className="text-xs text-muted-foreground">Media</dt>
                    <dd className="mt-1 capitalize">{selectedAsset.type}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Dimensions
                    </dt>
                    <dd className="mt-1">
                      {selectedAsset.width} × {selectedAsset.height}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Capability
                    </dt>
                    <dd className="mt-2">
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-3 py-2 font-normal"
                      >
                        {selectedAsset.capability}
                      </Badge>
                    </dd>
                  </div>
                </dl>

                {assets.length > 1 && (
                  <div className="mt-auto flex gap-2 pt-8">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => selectOffset(-1)}
                    >
                      <ArrowLeftIcon data-icon="inline-start" />
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => selectOffset(1)}
                    >
                      Next
                      <ArrowRightIcon data-icon="inline-end" />
                    </Button>
                  </div>
                )}
              </aside>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
