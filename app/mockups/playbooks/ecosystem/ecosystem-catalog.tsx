"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

type EcosystemApp = {
  name: string
  domain: string
  href: string
  description: string
  image: string
  tags: string[]
}

const ecosystemApps: EcosystemApp[] = [
  {
    name: "Daydream",
    domain: "daydream.live",
    href: "https://daydream.live",
    description:
      "Open-source, local-first platform for running real-time interactive generative AI video pipelines.",
    image: "/ecosystem/20260726-1500/daydream.svg",
    tags: ["AI Video", "Generative", "API"],
  },
  {
    name: "Frameworks",
    domain: "frameworks.network",
    href: "https://frameworks.network",
    description:
      "Open streaming stack for live video, from ingest to delivery, self-hosted or cloud.",
    image: "/ecosystem/20260726-1500/frameworks.svg",
    tags: ["Streaming", "Self-hosted", "API"],
  },
  {
    name: "Streamplace",
    domain: "stream.place",
    href: "https://stream.place",
    description:
      "The video layer for decentralized social networks, built on the AT Protocol.",
    image: "/ecosystem/20260726-1500/stream-place.png",
    tags: ["Streaming", "Decentralized", "API"],
  },
  {
    name: "Blue Claw",
    domain: "blueclaw.network",
    href: "https://blueclaw.network",
    description:
      "OpenAI-compatible inference for autonomous agents with flat-rate access and no token caps.",
    image: "/ecosystem/20260726-1500/blueclaw.webp",
    tags: ["Agents", "API"],
  },
  {
    name: "Livepeer Studio",
    domain: "livepeer.studio",
    href: "https://livepeer.studio",
    description:
      "Live video, VOD, and transcoding APIs powered by the Livepeer network.",
    image: "/ecosystem/20260726-1500/livepeer-studio.png",
    tags: ["Streaming", "API"],
  },
  {
    name: "Flipsuite",
    domain: "flipsuite.xyz",
    href: "https://flipsuite.xyz",
    description:
      "Community rewards, quests, payments, storefronts, and AI-powered tools routed through Livepeer.",
    image: "/ecosystem/20260726-1500/flipsuite.png",
    tags: ["Community", "Agents", "API"],
  },
  {
    name: "Embody",
    domain: "embody.zone",
    href: "https://embody.zone",
    description:
      "Open-source embodied AI avatars for tutoring, telepresence, and branded content.",
    image: "/ecosystem/20260726-1500/embody.svg",
    tags: ["AI Video", "Agents"],
  },
  {
    name: "The Lot Radio",
    domain: "thelotradio.com",
    href: "https://www.thelotradio.com",
    description:
      "Independent 24/7 online radio broadcasting live DJ sets from Brooklyn.",
    image: "/ecosystem/20260726-1500/thelotradio.svg",
    tags: ["Streaming", "Music"],
  },
  {
    name: "Tribe Social",
    domain: "tribesocial.io",
    href: "https://www.tribesocial.io",
    description:
      "Custom branded community apps with courses, live calls, and payments.",
    image: "/ecosystem/20260726-1500/tribesocial.webp",
    tags: ["Streaming", "Community"],
  },
  {
    name: "Higher",
    domain: "higher.zip",
    href: "https://higher.zip",
    description:
      "An onchain creative collective with missions, a shared treasury, and a Farcaster-native experience.",
    image: "/ecosystem/20260726-1500/higher-zip.svg",
    tags: ["Streaming", "Community", "Decentralized"],
  },
  {
    name: "NYTV",
    domain: "nytv.live",
    href: "https://nytv.live",
    description:
      "Independent 24/7 live television streaming culture and programming from New York.",
    image: "/ecosystem/20260726-1500/nytv-live.jpg",
    tags: ["Streaming", "Community"],
  },
  {
    name: "UFO",
    domain: "ufo.fm",
    href: "https://ufo.fm",
    description:
      "Independent culture, radio, editorial, and weekly mixes from contributors around the world.",
    image: "/ecosystem/20260726-1500/ufo-fm.svg",
    tags: ["Streaming", "Music", "Community"],
  },
]

const categories = [
  "All",
  ...Array.from(new Set(ecosystemApps.flatMap((app) => app.tags))).sort(),
]

export function EcosystemCatalog() {
  const [category, setCategory] = React.useState("All")
  const [query, setQuery] = React.useState("")

  const visibleApps = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return ecosystemApps.filter((app) => {
      const matchesCategory =
        category === "All" || app.tags.includes(category)
      const matchesQuery =
        !normalizedQuery ||
        [app.name, app.domain, app.description, ...app.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={category === "All" ? "default" : "outline"}
            onClick={() => setCategory("All")}
            className="rounded-sm"
          >
            All
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="rounded-sm">
                  {category === "All" ? "Categories" : category}
                  <ChevronDownIcon aria-hidden="true" />
                </Button>
              }
            />
            <DropdownMenuContent align="start" className="w-48 rounded-sm">
              {categories.slice(1).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setCategory(item)}
                  className="rounded-sm"
                >
                  {item}
                  {category === item && (
                    <CheckIcon className="ml-auto" aria-hidden="true" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <label className="relative block w-full sm:w-72">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Search ecosystem apps</span>
          <Input
            value={query}
            onInput={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search"
            className="h-10 rounded-sm border-border bg-background pl-9"
          />
        </label>
      </div>

      {visibleApps.length > 0 ? (
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleApps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-72 flex-col rounded-sm p-6 transition-colors hover:bg-muted/50"
            >
              <Image
                src={app.image}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-sm object-cover"
              />
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">{app.name}</h2>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {app.domain}
                  </p>
                </div>
                <ArrowUpRightIcon
                  className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {app.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {app.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-sm font-mono text-[0.6875rem] font-normal uppercase"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-sm text-muted-foreground">
          No ecosystem apps match your search.
        </p>
      )}
    </>
  )
}
