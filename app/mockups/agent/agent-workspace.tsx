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
  ImagePlusIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
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

const seedRuns = [
  {
    id: 12,
    prompt: initialPrompt,
    project: "Orbit",
    time: "Just now",
  },
  {
    id: 11,
    prompt:
      "Campaign still with a cobalt runner on black glass, low horizon light, cool studio atmosphere",
    project: "Orbit",
    time: "18 min ago",
  },
]

const imageClasses = [
  "object-cover",
  "scale-110 object-cover hue-rotate-15",
  "scale-125 -translate-x-3 object-cover saturate-75",
  "scale-110 translate-y-3 object-cover contrast-125",
]

type SourceFile = {
  name: string
  size: number
  url: string
}

type Generation = (typeof seedRuns)[number]

export function AgentWorkspace() {
  const [prompt, setPrompt] = useState("")
  const [sources, setSources] = useState<SourceFile[]>([])
  const [generations, setGenerations] = useState<Generation[]>(seedRuns)
  const [project, setProject] = useState("Orbit")
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    <main>
      <section className="border-b">
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
                "rounded-t-none! rounded-b-3xl! border bg-muted shadow-sm transition-colors",
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
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Drop anywhere on the input · Enter to generate · Shift Enter for a
            new line
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium">Recent</h2>
          <Button variant="ghost" size="sm">
            Filter
          </Button>
        </div>
        <div className="space-y-12">
          {generations.map((generation) => (
            <article key={generation.id} className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
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
                <Button variant="outline" size="sm">
                  <RotateCwIcon />
                  Rerun
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                {imageClasses.map((imageClass, index) => (
                  <div
                    key={imageClass}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={sampleImage}
                      alt={`Generation ${generation.id}, result ${index + 1}`}
                      fill
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-[1.03]",
                        imageClass
                      )}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="icon-xs"
                        aria-label="Use as reference"
                      >
                        <ImagePlusIcon />
                      </Button>
                      <a
                        href={sampleImage}
                        download={`generation-${generation.id}-${index + 1}.png`}
                        aria-label="Download image"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "icon-xs",
                        })}
                      >
                        <ArrowDownToLineIcon />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Button
        size="icon"
        aria-label="New creation"
        className="fixed right-4 bottom-20 shadow-lg sm:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <PlusIcon />
      </Button>
    </main>
  )
}
