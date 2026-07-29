"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  CopyIcon,
  CornerDownLeftIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMasonryCorners } from "@/components/mockups/use-masonry-corners"

export type ProjectAsset = {
  id: string
  type: "image" | "video"
  src: string
  alt: string
  width: number
  height: number
  capability: string
  title?: string
  prompt?: string
  source?: string
  format?: string
  durationSeconds?: number
  frameRate?: number
  videoCodec?: string
  audioCodec?: string
  sizeBytes?: number
}

function formatBytes(bytes: number) {
  if (bytes < 1_000_000) return `${Math.round(bytes / 1_000)} KB`
  return `${(bytes / 1_000_000).toFixed(1)} MB`
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

function AssetPromptEditor({ prompt = "" }: { prompt?: string }) {
  const [value, setValue] = useState(prompt)
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <label htmlFor="asset-revision-prompt" className="sr-only">
        Prompt
      </label>
      <Textarea
        id="asset-revision-prompt"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Describe the next iteration"
        className="mt-2 min-h-24 resize-none rounded-md"
      />
      <Button
        type="button"
        size="lg"
        className="mt-2 h-16 w-full rounded-sm px-4"
        onClick={copyPrompt}
        disabled={!value.trim()}
      >
        <CopyIcon data-icon="inline-start" />
        {copied ? "Copied" : "Copy prompt"}
      </Button>
    </div>
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
              <aside className="flex min-h-0 flex-col overflow-hidden border-t bg-background px-4 pt-14 pb-4 md:border-t-0 md:border-l">
                <DialogTitle className="sr-only">
                  {selectedAsset.title ?? "Asset details"}
                </DialogTitle>
                <div className="min-h-0 flex-1 overflow-y-auto px-1">
                  <dl className="divide-y text-xs">
                    {selectedAsset.title && (
                      <div className="flex items-start justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Title</dt>
                        <dd className="max-w-40 text-right">
                          {selectedAsset.title}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4 py-2">
                      <dt className="text-muted-foreground">Capability</dt>
                      <dd>
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-3 py-2 font-normal"
                        >
                          {selectedAsset.capability}
                        </Badge>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2">
                      <dt className="text-muted-foreground">Media</dt>
                      <dd className="capitalize">{selectedAsset.type}</dd>
                    </div>
                    {selectedAsset.format && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Format</dt>
                        <dd className="uppercase">{selectedAsset.format}</dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4 py-2">
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd>
                        {selectedAsset.width} × {selectedAsset.height}
                      </dd>
                    </div>
                    {selectedAsset.durationSeconds !== undefined && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Duration</dt>
                        <dd>{selectedAsset.durationSeconds.toFixed(1)}s</dd>
                      </div>
                    )}
                    {selectedAsset.frameRate !== undefined && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Frame rate</dt>
                        <dd>{selectedAsset.frameRate} fps</dd>
                      </div>
                    )}
                    {selectedAsset.videoCodec && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Video</dt>
                        <dd className="uppercase">
                          {selectedAsset.videoCodec}
                        </dd>
                      </div>
                    )}
                    {selectedAsset.audioCodec && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Audio</dt>
                        <dd className="uppercase">
                          {selectedAsset.audioCodec}
                        </dd>
                      </div>
                    )}
                    {selectedAsset.sizeBytes !== undefined && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Size</dt>
                        <dd>{formatBytes(selectedAsset.sizeBytes)}</dd>
                      </div>
                    )}
                    {selectedAsset.source && (
                      <div className="flex items-center justify-between gap-4 py-2">
                        <dt className="text-muted-foreground">Source</dt>
                        <dd className="capitalize">{selectedAsset.source}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="mt-4 shrink-0 border-t px-1 pt-4 pb-1">
                  <AssetPromptEditor
                    key={selectedAsset.id}
                    prompt={selectedAsset.prompt}
                  />
                </div>
              </aside>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
