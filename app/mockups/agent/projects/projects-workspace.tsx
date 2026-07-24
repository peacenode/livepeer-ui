"use client"

import { type DragEvent, useRef, useState } from "react"
import Image from "next/image"
import {
  CheckIcon,
  ChevronLeftIcon,
  EllipsisIcon,
  FolderIcon,
  PlayIcon,
  PlusIcon,
  Share2Icon,
  UploadIcon,
} from "lucide-react"

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
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { imageGroupRadius } from "../image-grid-utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

type Project = {
  id: string
  name: string
  updated: string
  thumbnailClass?: string
  thumbnailUrl?: string
  storyboards: { name: string; count: number; updated: string }[]
  characters: { name: string; count: number; updated: string }[]
  renders: {
    id: number
    prompt: string
    duration: string
    time: string
    imageClass?: string
  }[]
}

const initialProjects: Project[] = [
  {
    id: "orbit",
    name: "Orbit",
    updated: "Updated today",
    storyboards: [
      { name: "Orbit launch film", count: 30, updated: "Today, 2:14 PM" },
      { name: "Product reveal v2", count: 18, updated: "Today, 9:42 AM" },
    ],
    characters: [
      { name: "Mara", count: 18, updated: "Today, 1:48 PM" },
      { name: "The Courier", count: 12, updated: "Yesterday" },
    ],
    renders: [
      {
        id: 108,
        prompt:
          "Slow orbit around the product as the key light moves across the translucent upper",
        duration: "0:08",
        time: "Today, 2:14 PM",
      },
      {
        id: 107,
        prompt:
          "Macro push through chrome details into a wide hero composition",
        duration: "0:06",
        time: "Today, 1:56 PM",
        imageClass: "hue-rotate-15",
      },
      {
        id: 106,
        prompt:
          "Product suspended over black glass with a quiet reflected light sweep",
        duration: "0:10",
        time: "Today, 11:24 AM",
        imageClass: "contrast-125",
      },
      {
        id: 105,
        prompt:
          "Top-down rotation with graphic shadows and chrome spheres crossing frame",
        duration: "0:07",
        time: "Yesterday",
        imageClass: "saturate-75",
      },
      {
        id: 104,
        prompt:
          "Shoe descends through haze and settles above brushed aluminum",
        duration: "0:12",
        time: "Yesterday",
        imageClass: "brightness-90",
      },
      {
        id: 103,
        prompt:
          "Wide campaign loop with restrained motion in the reflective surface",
        duration: "0:15",
        time: "Jul 21",
      },
    ],
  },
  {
    id: "soft-launch",
    name: "Soft launch",
    updated: "Updated yesterday",
    thumbnailClass: "hue-rotate-30",
    storyboards: [
      { name: "Homepage loops", count: 12, updated: "Yesterday" },
    ],
    characters: [{ name: "June", count: 8, updated: "Jul 21" }],
    renders: [
      {
        id: 202,
        prompt: "Quiet product loop on a seamless black stage",
        duration: "0:08",
        time: "Yesterday",
        imageClass: "hue-rotate-30",
      },
      {
        id: 201,
        prompt: "Four lighting directions cut into a fast campaign sequence",
        duration: "0:05",
        time: "Jul 21",
        imageClass: "contrast-150",
      },
    ],
  },
  {
    id: "unsorted",
    name: "Unsorted",
    updated: "Updated Jul 21",
    thumbnailClass: "contrast-125",
    storyboards: [],
    characters: [],
    renders: [
      {
        id: 301,
        prompt: "Material and lighting exploration",
        duration: "0:06",
        time: "Today, 9:08 AM",
      },
    ],
  },
]

export function ProjectsWorkspace() {
  const [projects, setProjects] = useState(initialProjects)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )
  const [activeTab, setActiveTab] = useState("storyboards")
  const [selectedRenderId, setSelectedRenderId] = useState<number | null>(null)
  const [finals, setFinals] = useState<Record<string, number[]>>({
    orbit: [106],
    "soft-launch": [],
    unsorted: [],
  })
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [shareCopied, setShareCopied] = useState(false)
  const [isNewStoryboardOpen, setIsNewStoryboardOpen] = useState(false)
  const [storyboardTitle, setStoryboardTitle] = useState("")
  const [storyboardFiles, setStoryboardFiles] = useState<File[]>([])
  const [isStoryboardDragging, setIsStoryboardDragging] = useState(false)
  const storyboardUploadRef = useRef<HTMLInputElement>(null)
  const [isNewCharacterOpen, setIsNewCharacterOpen] = useState(false)
  const [characterName, setCharacterName] = useState("")
  const [characterFiles, setCharacterFiles] = useState<File[]>([])
  const [isCharacterDragging, setIsCharacterDragging] = useState(false)
  const characterUploadRef = useRef<HTMLInputElement>(null)
  const [isThumbnailOpen, setIsThumbnailOpen] = useState(false)
  const thumbnailUploadRef = useRef<HTMLInputElement>(null)
  const project =
    projects.find((item) => item.id === selectedProjectId) ?? projects[0]
  const selectedRender =
    project.renders.find((render) => render.id === selectedRenderId) ?? null
  const projectFinals = project.renders.filter((render) =>
    (finals[project.id] ?? []).includes(render.id)
  )

  function toggleFinal(renderId: number) {
    setFinals((current) => {
      const currentFinals = current[project.id] ?? []
      return {
        ...current,
        [project.id]: currentFinals.includes(renderId)
          ? currentFinals.filter((id) => id !== renderId)
          : [...currentFinals, renderId],
      }
    })
  }

  function shareFinals() {
    setShareCopied(true)
    window.setTimeout(() => setShareCopied(false), 1600)
  }

  function createProject() {
    const name = newProjectName.trim()
    if (!name) return
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      updated: "Updated just now",
      storyboards: [],
      characters: [],
      renders: [],
    }
    setProjects((current) => [...current, newProject])
    setSelectedProjectId(newProject.id)
    setFinals((current) => ({ ...current, [newProject.id]: [] }))
    setActiveTab("storyboards")
    setNewProjectName("")
    setIsNewProjectOpen(false)
  }

  function setStoryboardUpload(files: FileList | null) {
    if (!files?.length) return
    setStoryboardFiles(
      Array.from(files).filter((file) => file.type.startsWith("image/"))
    )
  }

  function handleStoryboardDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsStoryboardDragging(false)
    setStoryboardUpload(event.dataTransfer.files)
  }

  function createProjectStoryboard() {
    const name = storyboardTitle.trim()
    if (!name || storyboardFiles.length === 0) return
    setProjects((current) =>
      current.map((item) =>
        item.id === project.id
          ? {
              ...item,
              updated: "Updated just now",
              storyboards: [
                {
                  name,
                  count: storyboardFiles.length,
                  updated: "Just now",
                },
                ...item.storyboards,
              ],
            }
          : item
      )
    )
    setStoryboardTitle("")
    setStoryboardFiles([])
    setIsNewStoryboardOpen(false)
  }

  function setCharacterUpload(files: FileList | null) {
    if (!files?.length) return
    setCharacterFiles(
      Array.from(files).filter((file) => file.type.startsWith("image/"))
    )
  }

  function handleCharacterDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsCharacterDragging(false)
    setCharacterUpload(event.dataTransfer.files)
  }

  function createProjectCharacter() {
    const name = characterName.trim()
    if (!name || characterFiles.length === 0) return
    setProjects((current) =>
      current.map((item) =>
        item.id === project.id
          ? {
              ...item,
              updated: "Updated just now",
              characters: [
                {
                  name,
                  count: characterFiles.length,
                  updated: "Just now",
                },
                ...item.characters,
              ],
            }
          : item
      )
    )
    setCharacterName("")
    setCharacterFiles([])
    setIsNewCharacterOpen(false)
  }

  function setProjectThumbnail(file: File | undefined) {
    if (!file?.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setProjects((current) =>
      current.map((item) =>
        item.id === project.id
          ? { ...item, thumbnailUrl: url, thumbnailClass: "" }
          : item
      )
    )
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4">
            {selectedProjectId ? (
              <Button
                variant="ghost"
                className="-ml-3"
                onClick={() => {
                  setSelectedProjectId(null)
                  setSelectedRenderId(null)
                }}
              >
                <ChevronLeftIcon />
                Projects
              </Button>
            ) : (
              <h1 className="text-xl font-medium">Projects</h1>
            )}
            {!selectedProjectId && (
              <Button
                className="h-10 px-5"
                onClick={() => setIsNewProjectOpen(true)}
              >
                <PlusIcon className="size-6" />
                New project
              </Button>
            )}
          </header>

          {!selectedProjectId ? (
            <div className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-2"
                >
                  <button
                    type="button"
                    aria-label={`Open ${item.name}`}
                    className="absolute inset-0 z-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => {
                      setSelectedProjectId(item.id)
                      setActiveTab("storyboards")
                      setShareCopied(false)
                    }}
                  />
                  <div className="pointer-events-none relative z-[1]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={item.thumbnailUrl ?? sampleImage}
                        alt=""
                        fill
                        className={cn(
                          "object-cover transition-transform group-hover:scale-105",
                          item.thumbnailClass
                        )}
                        unoptimized={Boolean(item.thumbnailUrl)}
                      />
                    </div>
                    <h2 className="px-2 pt-3 text-base font-medium">
                      {item.name}
                    </h2>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-1">
                    <span className="pointer-events-none relative z-[1] text-xs text-muted-foreground">
                      {item.updated}
                    </span>
                    <div className="relative z-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Project options for ${item.name}`}
                            />
                          }
                        >
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>
                              Choose thumbnail
                            </DropdownMenuLabel>
                            {[
                              ["Latest render", ""],
                              ["Alternate render", "hue-rotate-30"],
                              ["High contrast", "contrast-125"],
                            ].map(([label, imageClass]) => (
                              <DropdownMenuItem
                                key={label}
                                onClick={() =>
                                  setProjects((current) =>
                                    current.map((projectItem) =>
                                      projectItem.id === item.id
                                        ? {
                                            ...projectItem,
                                            thumbnailClass: imageClass,
                                          }
                                        : projectItem
                                    )
                                  )
                                }
                              >
                                {label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    aria-label="Choose project thumbnail"
                    onClick={() => setIsThumbnailOpen(true)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault()
                      setProjectThumbnail(event.dataTransfer.files[0])
                    }}
                    className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted outline-none ring-1 ring-border transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Image
                      src={project.thumbnailUrl ?? sampleImage}
                      alt=""
                      fill
                      className={cn("object-cover", project.thumbnailClass)}
                      unoptimized={Boolean(project.thumbnailUrl)}
                    />
                  </button>
                  <div className="min-w-0">
                    <h1 className="truncate text-xl font-medium">
                      {project.name}
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.updated}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  disabled={projectFinals.length === 0}
                  onClick={shareFinals}
                >
                  <Share2Icon />
                  {shareCopied ? "Link copied" : "Share finals"}
                </Button>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mt-5 gap-6"
              >
                <TabsList
                  variant="line"
                  className="max-w-full justify-start overflow-x-auto"
                >
                  <TabsTrigger value="storyboards">
                    Storyboards
                  </TabsTrigger>
                  <TabsTrigger value="characters">Characters</TabsTrigger>
                  <TabsTrigger value="renders">
                    Renders
                    <span className="text-xs text-muted-foreground">
                      {project.renders.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="finals">
                    Finals
                    <span className="text-xs text-muted-foreground">
                      {projectFinals.length}
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="storyboards">
                  <ProjectImageCollections
                    title="Storyboards"
                    singular="storyboard"
                    items={project.storyboards}
                    onUpload={(files) => {
                      setStoryboardUpload(files)
                      if (files.length > 0) setIsNewStoryboardOpen(true)
                    }}
                    onAddImages={(name, count) =>
                      setProjects((current) =>
                        current.map((item) =>
                          item.id === project.id
                            ? {
                                ...item,
                                storyboards: item.storyboards.map(
                                  (storyboard) =>
                                    storyboard.name === name
                                      ? {
                                          ...storyboard,
                                          count: storyboard.count + count,
                                          updated: "Just now",
                                        }
                                      : storyboard
                                ),
                              }
                            : item
                        )
                      )
                    }
                  />
                </TabsContent>

                <TabsContent value="characters">
                  <ProjectImageCollections
                    title="Characters"
                    singular="character"
                    items={project.characters}
                    onUpload={(files) => {
                      setCharacterUpload(files)
                      if (files.length > 0) setIsNewCharacterOpen(true)
                    }}
                    onAddImages={(name, count) =>
                      setProjects((current) =>
                        current.map((item) =>
                          item.id === project.id
                            ? {
                                ...item,
                                characters: item.characters.map((character) =>
                                  character.name === name
                                    ? {
                                        ...character,
                                        count: character.count + count,
                                        updated: "Just now",
                                      }
                                    : character
                                ),
                              }
                            : item
                        )
                      )
                    }
                  />
                </TabsContent>

                <TabsContent value="renders">
                  <div className="mb-6 flex min-h-9 items-center justify-between gap-4">
                    <h3 className="text-sm font-medium">Renders</h3>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.location.assign(
                          `/mockups/agent?project=${encodeURIComponent(project.name)}`
                        )
                      }
                    >
                      <PlusIcon />
                      New render
                    </Button>
                  </div>
                  <RenderList
                    renders={project.renders}
                    finals={finals[project.id] ?? []}
                    onOpen={setSelectedRenderId}
                  />
                </TabsContent>

                <TabsContent value="finals">
                  {projectFinals.length > 0 ? (
                    <RenderList
                      renders={projectFinals}
                      finals={finals[project.id] ?? []}
                      onOpen={setSelectedRenderId}
                    />
                  ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center text-center">
                      <FolderIcon className="size-5 text-muted-foreground" />
                      <p className="mt-3 text-sm font-medium">No finals yet</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Open a render and mark it as final.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setActiveTab("renders")}
                      >
                        View renders
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>

      <Dialog
        open={selectedRender !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRenderId(null)
        }}
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-[min(1050px,calc(100%-3rem))]">
          <DialogHeader className="sr-only">
            <DialogTitle>Project render</DialogTitle>
            <DialogDescription>
              Review this render and add it to the project finals.
            </DialogDescription>
          </DialogHeader>
          {selectedRender && (
            <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="flex min-h-72 items-center bg-background lg:min-h-[590px]">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={sampleImage}
                    alt={`Render ${selectedRender.id}`}
                    fill
                    className={cn(
                      "object-cover",
                      selectedRender.imageClass
                    )}
                    priority
                  />
                  <span className="absolute right-3 bottom-3 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white">
                    {selectedRender.duration}
                  </span>
                </div>
              </div>
              <aside className="flex flex-col bg-background p-5 sm:p-6">
                <div className="pr-10">
                  <Badge variant="secondary">{project.name}</Badge>
                  <p className="mt-4 text-sm leading-relaxed">
                    {selectedRender.prompt}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {selectedRender.time}
                  </p>
                </div>
                <Button
                  className="mt-8 lg:mt-auto"
                  variant={
                    (finals[project.id] ?? []).includes(selectedRender.id)
                      ? "secondary"
                      : "default"
                  }
                  onClick={() => toggleFinal(selectedRender.id)}
                >
                  <CheckIcon />
                  {(finals[project.id] ?? []).includes(selectedRender.id)
                    ? "Marked as final"
                    : "Mark as final"}
                </Button>
              </aside>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isNewProjectOpen}
        onOpenChange={(open) => {
          setIsNewProjectOpen(open)
          if (!open) setNewProjectName("")
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Create a home for storyboards, characters, and renders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="project-name"
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              placeholder="Project name"
              autoFocus
            />
          </div>
          <Button
            disabled={!newProjectName.trim()}
            onClick={createProject}
          >
            Create project
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isNewStoryboardOpen}
        onOpenChange={(open) => {
          setIsNewStoryboardOpen(open)
          if (!open) {
            setStoryboardTitle("")
            setStoryboardFiles([])
            setIsStoryboardDragging(false)
          }
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>New storyboard</DialogTitle>
            <DialogDescription>
              Add a storyboard to {project.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label
              htmlFor="project-storyboard-title"
              className="text-sm font-medium"
            >
              Title
            </label>
            <Input
              id="project-storyboard-title"
              value={storyboardTitle}
              onChange={(event) => setStoryboardTitle(event.target.value)}
              placeholder="Storyboard title"
              autoFocus
            />
          </div>
          <div
            onDragEnter={(event) => {
              event.preventDefault()
              setIsStoryboardDragging(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsStoryboardDragging(false)
              }
            }}
            onDrop={handleStoryboardDrop}
            onClick={() => storyboardUploadRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                storyboardUploadRef.current?.click()
              }
            }}
            className={cn(
              "flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center transition-colors hover:bg-muted",
              isStoryboardDragging && "bg-muted"
            )}
          >
            <UploadIcon className="size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">
              {storyboardFiles.length > 0
                ? `${storyboardFiles.length} image${storyboardFiles.length === 1 ? "" : "s"} selected`
                : "Drop storyboard images here"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to choose files
            </p>
            <input
              ref={storyboardUploadRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => setStoryboardUpload(event.target.files)}
            />
          </div>
          <Button
            disabled={
              !storyboardTitle.trim() || storyboardFiles.length === 0
            }
            onClick={createProjectStoryboard}
          >
            Create storyboard
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isNewCharacterOpen}
        onOpenChange={(open) => {
          setIsNewCharacterOpen(open)
          if (!open) {
            setCharacterName("")
            setCharacterFiles([])
            setIsCharacterDragging(false)
          }
        }}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>New character</DialogTitle>
            <DialogDescription>
              Add a character to {project.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label
              htmlFor="project-character-name"
              className="text-sm font-medium"
            >
              Name
            </label>
            <Input
              id="project-character-name"
              value={characterName}
              onChange={(event) => setCharacterName(event.target.value)}
              placeholder="Character name"
              autoFocus
            />
          </div>
          <div
            onDragEnter={(event) => {
              event.preventDefault()
              setIsCharacterDragging(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsCharacterDragging(false)
              }
            }}
            onDrop={handleCharacterDrop}
            onClick={() => characterUploadRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                characterUploadRef.current?.click()
              }
            }}
            className={cn(
              "flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center transition-colors hover:bg-muted",
              isCharacterDragging && "bg-muted"
            )}
          >
            <UploadIcon className="size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">
              {characterFiles.length > 0
                ? `${characterFiles.length} image${characterFiles.length === 1 ? "" : "s"} selected`
                : "Drop character images here"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to choose files
            </p>
            <input
              ref={characterUploadRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => setCharacterUpload(event.target.files)}
            />
          </div>
          <Button
            disabled={!characterName.trim() || characterFiles.length === 0}
            onClick={createProjectCharacter}
          >
            Create character
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isThumbnailOpen}
        onOpenChange={setIsThumbnailOpen}
      >
        <DialogContent className="gap-5 rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Project thumbnail</DialogTitle>
            <DialogDescription>
              Choose an image from {project.name} or upload another.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {project.renders.map((render) => (
              <button
                key={render.id}
                type="button"
                aria-label={`Use render ${render.id} as thumbnail`}
                onClick={() => {
                  setProjects((current) =>
                    current.map((item) =>
                      item.id === project.id
                        ? {
                            ...item,
                            thumbnailUrl: undefined,
                            thumbnailClass: render.imageClass,
                          }
                        : item
                    )
                  )
                  setIsThumbnailOpen(false)
                }}
                className="relative aspect-square overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={sampleImage}
                  alt=""
                  fill
                  className={cn("object-cover", render.imageClass)}
                />
              </button>
            ))}
          </div>
          <label
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              setProjectThumbnail(event.dataTransfer.files[0])
              setIsThumbnailOpen(false)
            }}
            className="flex min-h-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border text-center transition-colors hover:bg-muted"
          >
            <div>
              <UploadIcon className="mx-auto size-5 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                Drop an image or click to upload
              </p>
            </div>
            <input
              ref={thumbnailUploadRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                setProjectThumbnail(event.target.files?.[0])
                setIsThumbnailOpen(false)
              }}
            />
          </label>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function ProjectImageCollections({
  title,
  singular,
  items,
  onUpload,
  onAddImages,
}: {
  title: string
  singular: "storyboard" | "character"
  items: { name: string; count: number; updated: string }[]
  onUpload: (files: FileList) => void
  onAddImages: (name: string, count: number) => void
}) {
  return (
    <div>
      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          onUpload(event.dataTransfer.files)
        }}
        className="flex min-h-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border px-6 text-center transition-colors hover:bg-muted"
      >
        <div>
          <PlusIcon className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">New {singular}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Drop images or click to upload
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) onUpload(event.target.files)
          }}
        />
      </label>
      {items.length > 0 ? (
        items.map((item) => (
          <section key={item.name} className="py-6">
            <div className="mb-4 flex min-h-9 flex-wrap items-center gap-3">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <span className="text-xs text-muted-foreground">
                {item.count} images · {item.updated}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 md:grid-cols-12">
              {Array.from({ length: item.count }, (_, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative aspect-square overflow-hidden bg-muted",
                    imageGroupRadius(index, item.count)
                  )}
                >
                  <Image
                    src={sampleImage}
                    alt=""
                    fill
                    className={cn(
                      "object-cover",
                      index % 4 === 1 && "hue-rotate-15",
                      index % 4 === 2 && "saturate-50",
                      index % 4 === 3 && "contrast-125"
                    )}
                  />
                </div>
              ))}
              <label
                className={cn(
                  "flex aspect-square items-center justify-center border border-dashed text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  "rounded-md"
                )}
              >
                <PlusIcon className="size-4" />
                <span className="sr-only">Add images to {item.name}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) =>
                    onAddImages(item.name, event.target.files?.length ?? 0)
                  }
                />
              </label>
            </div>
          </section>
        ))
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          <p className="text-sm font-medium">No {title.toLowerCase()} yet</p>
        </div>
      )}
    </div>
  )
}

function RenderList({
  renders,
  finals,
  onOpen,
}: {
  renders: Project["renders"]
  finals: number[]
  onOpen: (id: number) => void
}) {
  return (
    <div className="space-y-2">
      {renders.map((render) => (
        <article
          key={render.id}
          className="grid gap-4 py-1 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-6"
        >
          <button
            type="button"
            onClick={() => onOpen(render.id)}
            className="group relative aspect-video overflow-hidden rounded-xl bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={sampleImage}
              alt=""
              fill
              className={cn(
                "object-cover transition-transform group-hover:scale-105",
                render.imageClass
              )}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
              <span className="flex size-11 items-center justify-center rounded-full bg-background/90">
                <PlayIcon className="ml-0.5 size-5 fill-current" />
              </span>
            </span>
            <span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] text-white">
              {render.duration}
            </span>
            {finals.includes(render.id) && (
              <span className="absolute top-2 left-2 flex size-6 items-center justify-center rounded-full bg-background text-foreground">
                <CheckIcon className="size-3.5" />
                <span className="sr-only">Final</span>
              </span>
            )}
          </button>
          <div className="flex min-w-0 flex-col py-1">
            <p className="text-sm leading-relaxed">{render.prompt}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground lg:mt-auto">
              <span>{render.time}</span>
              {finals.includes(render.id) && (
                <Badge variant="secondary">Final</Badge>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
