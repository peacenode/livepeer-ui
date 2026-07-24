"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ApertureIcon,
  CheckIcon,
  FolderIcon,
  ImagesIcon,
  Layers3Icon,
  PlayIcon,
  PlusIcon,
  Share2Icon,
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
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const sampleImage = "/generated/2026-07-23-1730/cobalt-runner.png"

type Project = {
  id: string
  name: string
  storyboards: { name: string; count: number }[]
  characters: { name: string; count: number }[]
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
    storyboards: [
      { name: "Orbit launch film", count: 30 },
      { name: "Product reveal v2", count: 18 },
    ],
    characters: [
      { name: "Mara", count: 18 },
      { name: "The Courier", count: 12 },
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
    storyboards: [{ name: "Homepage loops", count: 12 }],
    characters: [{ name: "June", count: 8 }],
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
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjects[0].id
  )
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRenderId, setSelectedRenderId] = useState<number | null>(null)
  const [finals, setFinals] = useState<Record<string, number[]>>({
    orbit: [106],
    "soft-launch": [],
    unsorted: [],
  })
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [shareCopied, setShareCopied] = useState(false)
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
      storyboards: [],
      characters: [],
      renders: [],
    }
    setProjects((current) => [...current, newProject])
    setSelectedProjectId(newProject.id)
    setFinals((current) => ({ ...current, [newProject.id]: [] }))
    setActiveTab("overview")
    setNewProjectName("")
    setIsNewProjectOpen(false)
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4">
            <h1 className="text-xl font-medium">Projects</h1>
            <Button
              className="h-10 px-5"
              onClick={() => setIsNewProjectOpen(true)}
            >
              <PlusIcon />
              New project
            </Button>
          </header>

          <div className="flex gap-1 overflow-x-auto py-2">
            {projects.map((item) => (
              <Button
                key={item.id}
                variant={
                  selectedProjectId === item.id ? "secondary" : "ghost"
                }
                onClick={() => {
                  setSelectedProjectId(item.id)
                  setActiveTab("overview")
                  setShareCopied(false)
                }}
              >
                <FolderIcon />
                {item.name}
              </Button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">{project.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.storyboards.length} storyboards ·{" "}
                {project.characters.length} characters ·{" "}
                {project.renders.length} renders
              </p>
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
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
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

            <TabsContent value="overview" className="space-y-10">
              <ProjectCollection
                title="Storyboards"
                icon={Layers3Icon}
                items={project.storyboards}
                empty="No storyboards in this project"
              />
              <ProjectCollection
                title="Characters"
                icon={ApertureIcon}
                items={project.characters}
                empty="No characters in this project"
              />
            </TabsContent>

            <TabsContent value="renders">
              <RenderGrid
                renders={project.renders}
                finals={finals[project.id] ?? []}
                onOpen={setSelectedRenderId}
              />
            </TabsContent>

            <TabsContent value="finals">
              {projectFinals.length > 0 ? (
                <RenderGrid
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
    </main>
  )
}

function ProjectCollection({
  title,
  icon: Icon,
  items,
  empty,
}: {
  title: string
  icon: typeof ImagesIcon
  items: { name: string; count: number }[]
  empty: string
}) {
  return (
    <section>
      <div className="mb-4 flex min-h-9 items-center gap-2">
        <Icon className="size-4" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              className="flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-muted"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={sampleImage} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.count} images
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{empty}</p>
      )}
    </section>
  )
}

function RenderGrid({
  renders,
  finals,
  onOpen,
}: {
  renders: Project["renders"]
  finals: number[]
  onOpen: (id: number) => void
}) {
  return (
    <div className="grid gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {renders.map((render) => (
        <button
          key={render.id}
          type="button"
          onClick={() => onOpen(render.id)}
          className="group min-w-0 text-left"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
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
              <span className="flex size-10 items-center justify-center rounded-full bg-background/90">
                <PlayIcon className="ml-0.5 size-4 fill-current" />
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
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-snug">
            {render.prompt}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{render.time}</p>
        </button>
      ))}
    </div>
  )
}
