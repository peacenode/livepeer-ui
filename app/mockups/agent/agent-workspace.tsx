"use client"

import {
  type DragEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import {
  ArrowDownToLineIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  FolderOpenIcon,
  ImagesIcon,
  Layers3Icon,
  PaperclipIcon,
  PlayIcon,
  PlusIcon,
  RotateCwIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

const initialPrompt =
  "A translucent cobalt running shoe suspended above rippled brushed aluminum, sharp diagonal studio light, chrome details"

type Reference =
  | { kind: "storyboard"; name: string; count: number }
  | { kind: "images"; count: number }

type Generation = {
  id: number
  prompt: string
  project: string
  time: string
  duration: string
  reference: Reference
  imageClass?: string
}

const seedRuns: Generation[] = [
  {
    id: 18,
    prompt: initialPrompt,
    project: "Orbit",
    time: "Just now",
    duration: "0:08",
    reference: {
      kind: "storyboard",
      name: "Orbit launch film",
      count: 30,
    },
  },
  {
    id: 17,
    prompt:
      "Campaign still with a cobalt runner on black glass, low horizon light, cool studio atmosphere",
    project: "Orbit",
    time: "18 min ago",
    duration: "0:06",
    reference: { kind: "images", count: 8 },
    imageClass: "hue-rotate-15",
  },
  {
    id: 16,
    prompt:
      "Slow orbit around the product as the key light sweeps across the translucent upper",
    project: "Orbit",
    time: "42 min ago",
    duration: "0:10",
    reference: {
      kind: "storyboard",
      name: "Product reveal v2",
      count: 14,
    },
    imageClass: "contrast-125",
  },
  {
    id: 15,
    prompt:
      "Macro push through chrome details into a wide hero frame, restrained camera movement",
    project: "Orbit",
    time: "Today, 11:24 AM",
    duration: "0:07",
    reference: { kind: "images", count: 4 },
    imageClass: "saturate-75",
  },
  {
    id: 14,
    prompt:
      "Shoe descends through soft haze and settles just above a mirrored aluminum surface",
    project: "Orbit",
    time: "Today, 9:08 AM",
    duration: "0:12",
    reference: {
      kind: "storyboard",
      name: "Opening sequence",
      count: 22,
    },
    imageClass: "brightness-90",
  },
  {
    id: 13,
    prompt:
      "Top-down rotation with hard graphic shadows and small chrome spheres crossing frame",
    project: "Soft launch",
    time: "Yesterday",
    duration: "0:08",
    reference: { kind: "images", count: 12 },
    imageClass: "hue-rotate-30",
  },
  {
    id: 12,
    prompt:
      "Wide campaign loop, quiet motion in the reflective surface, product held perfectly still",
    project: "Soft launch",
    time: "Yesterday",
    duration: "0:15",
    reference: {
      kind: "storyboard",
      name: "Homepage loops",
      count: 18,
    },
  },
  {
    id: 11,
    prompt:
      "Fast cut test between four lighting directions on a seamless black stage",
    project: "Unsorted",
    time: "Jul 21",
    duration: "0:05",
    reference: { kind: "images", count: 16 },
    imageClass: "contrast-150",
  },
]

type SourceFile = {
  name: string
  size: number
  url: string
}

export function AgentWorkspace() {
  const [prompt, setPrompt] = useState("")
  const [sources, setSources] = useState<SourceFile[]>([])
  const [generations, setGenerations] = useState<Generation[]>(seedRuns)
  const [project, setProject] = useState("Orbit")
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLElement>(null)

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
          size: file.size,
          url: URL.createObjectURL(file),
        })),
    ])
  }

  function handleDrop(event: DragEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  function generate(event?: FormEvent) {
    event?.preventDefault()
    if (!prompt.trim() || isGenerating) return
    setIsGenerating(true)
    window.setTimeout(() => {
      setGenerations((current) => [
        {
          id: current[0].id + 1,
          prompt: prompt.trim(),
          project,
          time: "Just now",
          duration: "0:08",
          reference:
            sources.length > 0
              ? { kind: "images", count: sources.length }
              : {
                  kind: "storyboard",
                  name: "Orbit launch film",
                  count: 30,
                },
        },
        ...current.map((item, index) =>
          index === 0 && item.time === "Just now"
            ? { ...item, time: "1 min ago" }
            : item
        ),
      ])
      setPrompt("")
      setSources([])
      setIsGenerating(false)
    }, 900)
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden overscroll-none md:h-dvh">
      <section className="shrink-0">
        <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-10">
          <form
            onSubmit={generate}
            onDragEnter={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsDragging(false)
              }
            }}
            onDrop={handleDrop}
          >
            <InputGroup
              className={cn(
                "rounded-t-none! rounded-b-3xl! border bg-muted shadow-sm transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-border! has-[[data-slot=input-group-control]:focus-visible]:ring-0!",
                isDragging && "border-foreground"
              )}
            >
              {sources.length > 0 && (
                <InputGroupAddon
                  align="block-start"
                  className="block cursor-default px-3 pt-3"
                >
                  <AttachmentGroup>
                    {sources.map((source) => (
                      <Attachment key={source.url} size="sm">
                        <AttachmentMedia variant="image">
                          <Image
                            src={source.url}
                            alt=""
                            width={32}
                            height={32}
                            unoptimized
                          />
                        </AttachmentMedia>
                        <AttachmentContent className="max-w-32">
                          <AttachmentTitle>{source.name}</AttachmentTitle>
                          <AttachmentDescription>
                            {Math.max(1, Math.round(source.size / 1024))} KB
                          </AttachmentDescription>
                        </AttachmentContent>
                        <AttachmentActions>
                          <AttachmentAction
                            aria-label={`Remove ${source.name}`}
                            onClick={() =>
                              setSources((current) =>
                                current.filter(
                                  (item) => item.url !== source.url
                                )
                              )
                            }
                          >
                            <XIcon />
                          </AttachmentAction>
                        </AttachmentActions>
                      </Attachment>
                    ))}
                  </AttachmentGroup>
                </InputGroupAddon>
              )}
              <InputGroupTextarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder={
                  isDragging
                    ? "Drop images to attach"
                    : "Describe an image, scene, storyboard, or character..."
                }
                aria-label="Creation prompt"
                className="min-h-28 px-4 pt-4 text-base md:text-base"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    generate()
                  }
                }}
              />
              <InputGroupAddon
                align="block-end"
                className="justify-between gap-2 px-3 pb-3"
              >
                <div className="flex min-w-0 items-center gap-1">
                  <InputGroupButton
                    size="icon-sm"
                    aria-label="Attach images"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PaperclipIcon />
                  </InputGroupButton>
                  <InputGroupButton
                    size="icon-sm"
                    aria-label="Attach a folder"
                    onClick={() => folderInputRef.current?.click()}
                  >
                    <FolderOpenIcon />
                  </InputGroupButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton className="max-w-36 min-w-0 px-2" />
                      }
                    >
                      <InputGroupText className="truncate text-xs">
                        {project}
                        <ChevronDownIcon />
                      </InputGroupText>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Save to project</DropdownMenuLabel>
                        {["Orbit", "Soft launch", "Unsorted"].map((item) => (
                          <DropdownMenuItem
                            key={item}
                            onClick={() => setProject(item)}
                          >
                            {item}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  type="submit"
                  size="icon-sm"
                  aria-label="Generate"
                  disabled={!prompt.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <RotateCwIcon className="animate-spin" />
                  ) : (
                    <ArrowUpIcon />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => addFiles(event.target.files)}
            />
            <input
              ref={folderInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => addFiles(event.target.files)}
            />
          </form>
        </div>
      </section>

      <section
        ref={resultsRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-none"
      >
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-medium">Recent</h2>
            <Button variant="ghost" size="sm">
              Filter
            </Button>
          </div>
          <div className="space-y-12">
            {generations.map((generation) => (
              <article key={generation.id} className="space-y-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{generation.project}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {generation.time}
                    </span>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed">
                    {generation.prompt}
                  </p>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={sampleImage}
                    alt={`Video render ${generation.id}`}
                    fill
                    className={cn(
                      "scale-110 object-cover",
                      generation.imageClass
                    )}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button
                      type="button"
                      aria-label={`Play render ${generation.id}`}
                      className="flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur"
                    >
                      <PlayIcon className="ml-0.5 size-5 fill-current" />
                    </button>
                  </div>
                  <span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    {generation.duration}
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  {generation.reference.kind === "storyboard" ? (
                    <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                      <Layers3Icon className="size-4 shrink-0" />
                      <span className="truncate font-medium text-foreground">
                        {generation.reference.name}
                      </span>
                      <span className="shrink-0">
                        {generation.reference.count} frames
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className="relative size-7 overflow-hidden rounded-md bg-muted ring-2 ring-background"
                          >
                            <Image
                              src={sampleImage}
                              alt=""
                              fill
                              className={cn(
                                "object-cover",
                                index === 1 && "hue-rotate-15",
                                index === 2 && "contrast-125"
                              )}
                            />
                          </div>
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5">
                        <ImagesIcon className="size-3.5" />
                        {generation.reference.count} source images
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <SparklesIcon />
                      Get alternates
                    </Button>
                    <a
                      href={sampleImage}
                      download={`render-${generation.id}.mp4`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      <ArrowDownToLineIcon />
                      Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Button
        size="icon"
        aria-label="New creation"
        className="fixed right-4 bottom-20 shadow-lg sm:hidden"
        onClick={() =>
          resultsRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <PlusIcon />
      </Button>
    </main>
  )
}
