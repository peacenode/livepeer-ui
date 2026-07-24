import Link from "next/link"
import {
  ArrowRightIcon,
  BoxesIcon,
  ClapperboardIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

type EntityType = "storyboards" | "characters" | "projects"

const pageData = {
  storyboards: {
    title: "Storyboards",
    description:
      "Plan scenes, generate frames, or bring in an existing board. Every storyboard belongs to a project.",
    action: "New storyboard",
    icon: ClapperboardIcon,
    items: [
      {
        name: "Orbit launch film",
        detail: "18 scenes · Updated today",
        project: "Orbit",
      },
      {
        name: "Opening sequence",
        detail: "8 scenes · Updated Tuesday",
        project: "Soft launch",
      },
    ],
  },
  characters: {
    title: "Characters",
    description:
      "Identify a character from an image or start from a description, then build a consistent reference set.",
    action: "New character",
    icon: UsersIcon,
    items: [
      {
        name: "Mara",
        detail: "12 references · Updated today",
        project: "Orbit",
      },
      {
        name: "The Courier",
        detail: "7 references · Updated Monday",
        project: "Orbit",
      },
      {
        name: "June",
        detail: "4 references · Draft",
        project: "Soft launch",
      },
    ],
  },
  projects: {
    title: "Projects",
    description:
      "Keep generations, storyboards, and characters together from first idea through final delivery.",
    action: "New project",
    icon: BoxesIcon,
    items: [
      {
        name: "Orbit",
        detail: "2 storyboards · 2 characters · 38 generations",
        project: "Active",
      },
      {
        name: "Soft launch",
        detail: "1 storyboard · 1 character · 14 generations",
        project: "Active",
      },
      {
        name: "Unsorted",
        detail: "No storyboards · 6 generations",
        project: "Inbox",
      },
    ],
  },
}

export function EntityPage({ type }: { type: EntityType }) {
  const data = pageData[type]
  const Icon = data.icon

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 flex size-9 items-center justify-center rounded-xl bg-muted">
            <Icon className="size-4" />
          </div>
          <h1 className="text-2xl font-medium text-balance">{data.title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {data.description}
          </p>
        </div>
        <Link href="/mockups/agent" className={buttonVariants({ size: "sm" })}>
          <PlusIcon />
          {data.action}
        </Link>
      </div>

      <div className="mt-10 divide-y border-y">
        {data.items.map((item) => (
          <Link
            key={item.name}
            href="/mockups/agent"
            className="group flex items-center gap-4 py-5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-medium">
              {item.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {item.detail}
              </p>
            </div>
            <Badge variant="secondary">{item.project}</Badge>
            <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl bg-muted/50 p-4">
        <BoxesIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Projects are the shared home for storyboards, characters, and every
          generation used to build them.
        </p>
      </div>
    </main>
  )
}
