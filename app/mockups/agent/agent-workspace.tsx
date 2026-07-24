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
  SearchIcon,
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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

const initialPrompt =
  "A translucent cobalt running shoe suspended above rippled brushed aluminum, sharp diagonal studio light, chrome details"

function getRerollPrompts(generation: Generation) {
  return [
    `${generation.prompt}, with slower camera movement and softer directional light`,
    `Reframe the same subject as a tight macro sequence, preserving the materials and color palette`,
    `Keep the composition, but move the camera in a low orbit with stronger reflections`,
    `Create a seamless loop with the subject locked in place and the key light moving across frame`,
  ]
}

type Reference =
  | { kind: "storyboard"; name: string; count: number }
  | { kind: "images"; count: number }

type Generation = {
  id: number
  prompt: string
  project: string
  section: string
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
    section: "Today",
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
    section: "Today",
    time: "1:56 PM",
    duration: "0:06",
    reference: { kind: "images", count: 8 },
    imageClass: "hue-rotate-15",
  },
  {
    id: 16,
    prompt:
      "Slow orbit around the product as the key light sweeps across the translucent upper",
    project: "Orbit",
    section: "Today",
    time: "1:32 PM",
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
    section: "Today",
    time: "11:24 AM",
    duration: "0:07",
    reference: { kind: "images", count: 4 },
    imageClass: "saturate-75",
  },
  {
    id: 14,
    prompt:
      "Shoe descends through soft haze and settles just above a mirrored aluminum surface",
    project: "Orbit",
    section: "Today",
    time: "9:08 AM",
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
    section: "Yesterday",
    time: "6:42 PM",
    duration: "0:08",
    reference: { kind: "images", count: 12 },
    imageClass: "hue-rotate-30",
  },
  {
    id: 12,
    prompt:
      "Wide campaign loop, quiet motion in the reflective surface, product held perfectly still",
    project: "Soft launch",
    section: "Yesterday",
    time: "10:17 AM",
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
    section: "Jul 21, 2026",
    time: "4:05 PM",
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
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedGeneration, setSelectedGeneration] =
    useState<Generation | null>(null)
  const [composerHeight, setComposerHeight] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const composerRef = useRef<HTMLElement>(null)
  const resultsRef = useRef<HTMLElement>(null)
  const visibleGenerations = generations.filter((generation) =>
    generation.prompt.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )
  const groupedGenerations = Object.entries(
    visibleGenerations.reduce<Record<string, Generation[]>>(
      (groups, generation) => {
        groups[generation.section] ??= []
        groups[generation.section].push(generation)
        return groups
      },
      {}
    )
  )

  useEffect(() => {
    folderInputRef.current?.setAttribute("webkitdirectory", "")
  }, [])

  useEffect(() => {
    if (!composerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setComposerHeight(
        entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height
      )
    })
    observer.observe(composerRef.current)
    return () => observer.disconnect()
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

  function startGeneration(nextPrompt: string) {
    const cleanPrompt = nextPrompt.trim()
    if (!cleanPrompt || isGenerating) return
    setIsGenerating(true)
    setSelectedGeneration(null)
    resultsRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    window.setTimeout(() => {
      setGenerations((current) => [
        {
          id: current[0].id + 1,
          prompt: cleanPrompt,
          project,
          section: "Today",
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
        ...current,
      ])
      setPrompt("")
      setSources([])
      setIsGenerating(false)
    }, 900)
  }

  function generate(event?: FormEvent) {
    event?.preventDefault()
    startGeneration(prompt)
  }

  return (
    <main className="relative h-[calc(100dvh-4rem)] overflow-hidden overscroll-none md:h-dvh">
      <section ref={composerRef} className="absolute inset-x-0 top-0 z-20">
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
                "rounded-t-none! rounded-b-3xl! border border-t-0 border-black bg-black text-white shadow-xl transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-black! has-[[data-slot=input-group-control]:focus-visible]:ring-0!",
                isDragging && "bg-black"
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
                className="min-h-28 px-4 pt-4 text-base text-white caret-white placeholder:text-white/50 md:text-base"
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
                    className="text-white hover:bg-white/10 hover:text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PaperclipIcon />
                  </InputGroupButton>
                  <InputGroupButton
                    size="icon-sm"
                    aria-label="Attach a folder"
                    className="text-white hover:bg-white/10 hover:text-white"
                    onClick={() => folderInputRef.current?.click()}
                  >
                    <FolderOpenIcon />
                  </InputGroupButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton className="max-w-36 min-w-0 px-2 text-white hover:bg-white/10 hover:text-white" />
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
                  className="bg-white text-black hover:bg-white/80"
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
        className="absolute inset-0 overflow-y-auto overscroll-none"
      >
        <div
          className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 sm:pb-10"
          style={{ paddingTop: composerHeight + 32 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-medium">
              {groupedGenerations[0]?.[0] ?? "History"}
            </h2>
            <InputGroup className="h-8 w-52 border border-border bg-background sm:w-64">
              <InputGroupInput
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search prompts"
                aria-label="Search prompts"
              />
              <InputGroupAddon align="inline-start">
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div>
            {groupedGenerations.map(([section, items], sectionIndex) => (
              <section key={section} className={cn(sectionIndex > 0 && "mt-6")}>
                {sectionIndex > 0 && (
                  <h2 className="mb-3 text-sm font-medium">{section}</h2>
                )}
                <div className="space-y-2">
                  {items.map((generation) => (
                    <article
                      key={generation.id}
                      className="grid gap-4 py-1 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-6"
                    >
                      <button
                        type="button"
                        aria-label={`Open render ${generation.id}`}
                        onClick={() => setSelectedGeneration(generation)}
                        className="group relative aspect-video overflow-hidden rounded-xl bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Image
                          src={sampleImage}
                          alt={`Video render ${generation.id}`}
                          fill
                          className={cn(
                            "scale-110 object-cover",
                            generation.imageClass
                          )}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                          <span className="flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur">
                            <PlayIcon className="ml-0.5 size-5 fill-current" />
                          </span>
                        </div>
                        <span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-medium text-white">
                          {generation.duration}
                        </span>
                      </button>
                      <div className="flex min-w-0 flex-col py-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {generation.project}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {generation.time}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed">
                            {generation.prompt}
                          </p>
                        </div>

                        <div className="mt-5 lg:mt-auto">
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
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            {visibleGenerations.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No prompts match “{searchQuery}”
              </p>
            )}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedGeneration !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedGeneration(null)
        }}
      >
        <DialogContent
          className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-[min(1100px,calc(100%-3rem))]"
          showCloseButton
        >
          <DialogHeader className="sr-only">
            <DialogTitle>
              Render {selectedGeneration?.id ?? ""}
            </DialogTitle>
            <DialogDescription>
              Watch the render, review its metadata, download it, or create a
              variation.
            </DialogDescription>
          </DialogHeader>
          {selectedGeneration && (
            <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="flex min-h-72 items-center bg-background lg:min-h-[620px]">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={sampleImage}
                    alt={`Video render ${selectedGeneration.id}`}
                    fill
                    className={cn(
                      "object-cover",
                      selectedGeneration.imageClass
                    )}
                    priority
                  />
                  <button
                    type="button"
                    aria-label={`Play render ${selectedGeneration.id}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 text-foreground"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur">
                      <PlayIcon className="ml-1 size-6 fill-current" />
                    </span>
                  </button>
                  <span className="absolute right-3 bottom-3 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white">
                    {selectedGeneration.duration}
                  </span>
                </div>
              </div>

              <aside className="flex min-w-0 flex-col bg-background p-5 sm:p-6">
                <div className="pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {selectedGeneration.project}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedGeneration.section} · {selectedGeneration.time}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">
                    {selectedGeneration.prompt}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    {selectedGeneration.reference.kind === "storyboard" ? (
                      <div className="flex items-center gap-2">
                        <Layers3Icon className="size-4" />
                        <span className="font-medium text-foreground">
                          {selectedGeneration.reference.name}
                        </span>
                        <span>
                          {selectedGeneration.reference.count} frames
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ImagesIcon className="size-4" />
                        <span>
                          {selectedGeneration.reference.count} source images
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={sampleImage}
                  download={`render-${selectedGeneration.id}.mp4`}
                  className="mt-6 inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <ArrowDownToLineIcon className="size-4" />
                  Download
                </a>

                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Reroll with
                  </p>
                  <div className="space-y-1">
                    {getRerollPrompts(selectedGeneration).map(
                      (rerollPrompt, index) => (
                        <button
                          key={rerollPrompt}
                          type="button"
                          onClick={() => startGeneration(rerollPrompt)}
                          disabled={isGenerating}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-sm leading-snug transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                        >
                          <span className="mr-2 text-xs text-muted-foreground">
                            {index + 1}
                          </span>
                          {rerollPrompt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
