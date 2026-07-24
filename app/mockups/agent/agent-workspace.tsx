"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowDownToLineIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  FilesIcon,
  FolderOpenIcon,
  ImageIcon,
  ImagesIcon,
  PlusIcon,
  RotateCwIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

const initialPrompt =
  "A translucent cobalt running shoe suspended above rippled brushed aluminum, sharp diagonal studio light, chrome details"

const alternatives = [
  "Place the shoe on mirrored black glass with a low, electric-blue horizon light.",
  "Turn the scene into a macro editorial crop with condensation and soft silver light.",
  "Suspend the shoe inside a clear acrylic cube with hard midday shadows.",
  "Reframe as a top-down campaign image with chrome spheres and rippled metal.",
]

const variants = [
  { id: 1, label: "01", imageClass: "object-cover" },
  { id: 2, label: "02", imageClass: "scale-110 object-cover hue-rotate-15" },
  {
    id: 3,
    label: "03",
    imageClass: "scale-125 -translate-x-3 object-cover saturate-75",
  },
  {
    id: 4,
    label: "04",
    imageClass: "scale-110 translate-y-3 object-cover contrast-125",
  },
]

type SourceFile = {
  name: string
  url: string
}

export function AgentWorkspace() {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [sources, setSources] = useState<SourceFile[]>([])
  const [selected, setSelected] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [run, setRun] = useState(12)
  const folderInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    folderInputRef.current?.setAttribute("webkitdirectory", "")
  }, [])

  function addFiles(files: FileList | null) {
    if (!files) return
    setSources((current) => [
      ...current,
      ...Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, Math.max(0, 12 - current.length))
        .map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
    ])
  }

  function generate(nextPrompt = prompt) {
    if (!nextPrompt.trim() || isGenerating) return
    setPrompt(nextPrompt)
    setIsGenerating(true)
    window.setTimeout(() => {
      setRun((current) => current + 1)
      setSelected(1)
      setIsGenerating(false)
    }, 900)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <LivepeerLockup className="h-4 w-auto shrink-0" />
          <Separator orientation="vertical" className="h-4" />
          <span className="truncate text-sm text-muted-foreground">
            Image agent
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            History
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-foreground text-xs text-background">
              P
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1480px] flex-1 gap-0 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
        <aside className="border-b p-4 sm:p-6 lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:border-r lg:border-b-0">
          <div className="flex h-full flex-col gap-6">
            <div>
              <p className="text-sm font-medium">Create images</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add references, describe the result, then generate four options.
              </p>
            </div>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">References</label>
                {sources.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {sources.length}/12
                  </span>
                )}
              </div>
              {sources.length === 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                    <ImageIcon className="size-4" />
                    Add images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(event) => addFiles(event.target.files)}
                    />
                  </label>
                  <button
                    type="button"
                    className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    onClick={() => folderInputRef.current?.click()}
                  >
                    <FolderOpenIcon className="size-4" />
                    Add folder
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {sources.map((source) => (
                    <div
                      key={source.url}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        src={source.url}
                        alt={source.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        aria-label={`Remove ${source.name}`}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-xs transition-opacity group-hover:opacity-100"
                        onClick={() =>
                          setSources((current) =>
                            current.filter((item) => item.url !== source.url)
                          )
                        }
                      >
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  ))}
                  <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed text-muted-foreground hover:bg-muted/50">
                    <PlusIcon className="size-4" />
                    <span className="sr-only">Add more images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(event) => addFiles(event.target.files)}
                    />
                  </label>
                </div>
              )}
              <input
                ref={folderInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(event) => addFiles(event.target.files)}
              />
            </section>

            <section className="space-y-3">
              <label htmlFor="prompt" className="text-xs font-medium">
                Prompt
              </label>
              <div className="rounded-2xl border bg-background p-1 shadow-xs focus-within:ring-3 focus-within:ring-ring/20">
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Describe what you want to create"
                  className="min-h-32 border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center justify-between px-2 pb-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    1:1 <ChevronDownIcon className="size-3" />
                  </button>
                  <Button
                    size="sm"
                    disabled={!prompt.trim() || isGenerating}
                    onClick={() => generate()}
                  >
                    {isGenerating ? (
                      <RotateCwIcon className="animate-spin" />
                    ) : (
                      <ArrowUpIcon />
                    )}
                    {isGenerating ? "Generating" : "Generate"}
                  </Button>
                </div>
              </div>
            </section>

            <div className="mt-auto hidden items-center justify-between border-t pt-4 text-xs text-muted-foreground lg:flex">
              <span>Flux 1.1 Pro</span>
              <span>4 images · 6 credits</span>
            </div>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-medium text-balance">
                    Generation {run}
                  </h1>
                  <Badge variant="secondary">4 images</Badge>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {prompt}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isGenerating}
                  onClick={() => generate()}
                >
                  <RotateCwIcon />
                  Reroll
                </Button>
                <a
                  href={sampleImage}
                  download={`generation-${run}-${selected}.png`}
                  className={buttonVariants({ size: "sm" })}
                >
                  <ArrowDownToLineIcon />
                  Download
                </a>
              </div>
            </div>

            <div
              className={cn(
                "grid grid-cols-2 gap-2 transition-opacity sm:gap-3",
                isGenerating && "animate-pulse opacity-40"
              )}
            >
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  aria-label={`Select result ${variant.label}`}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-xl bg-muted ring-offset-2 ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    selected === variant.id && "ring-2 ring-foreground"
                  )}
                  onClick={() => setSelected(variant.id)}
                >
                  <Image
                    src={sampleImage}
                    alt={`Cobalt running shoe variation ${variant.label}`}
                    fill
                    priority={variant.id === 1}
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-[1.03]",
                      variant.imageClass
                    )}
                  />
                  <span className="absolute top-2 left-2 flex size-6 items-center justify-center rounded-full bg-background/90 text-[10px] font-medium shadow-xs backdrop-blur">
                    {variant.label}
                  </span>
                </button>
              ))}
            </div>

            <section className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4" />
                <h2 className="text-sm font-medium">Try another direction</h2>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {alternatives.map((alternative, index) => (
                  <button
                    key={alternative}
                    type="button"
                    className="group flex min-h-20 items-start gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-muted/50"
                    onClick={() => generate(alternative)}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed">
                      {alternative}
                    </span>
                    <ArrowUpIcon className="mt-1 ml-auto size-3.5 shrink-0 rotate-45 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </section>

            <div className="flex items-center justify-center gap-4 pb-4 text-xs text-muted-foreground lg:hidden">
              <span className="flex items-center gap-1.5">
                <FilesIcon className="size-3.5" />
                Flux 1.1 Pro
              </span>
              <span className="flex items-center gap-1.5">
                <ImagesIcon className="size-3.5" />4 images · 6 credits
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
