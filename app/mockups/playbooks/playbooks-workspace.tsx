"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  Clock3Icon,
  CodeIcon,
  CpuIcon,
  MessageCircleIcon,
  TerminalIcon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Category = "All" | "Brand" | "Creator" | "Video" | "Product"

type Playbook = {
  name: string
  description: string
  category: Exclude<Category, "All">
  workflows: string[]
  duration: string
  cost: string
  runs: string
  image: string
}

const categories: Category[] = ["All", "Brand", "Creator", "Video", "Product"]

const playbooks: Playbook[] = [
  {
    name: "Product launch campaign",
    description:
      "Turn one product brief into a visual direction, hero images, lifestyle scenes, and a finished launch reel.",
    category: "Brand",
    workflows: ["Brand kit", "Product scenes", "Launch reel"],
    duration: "25 min",
    cost: "$1.40–$3.40",
    runs: "1.8K runs",
    image: "/generated/2026-07-24-004043/black-tide-wide.webp",
  },
  {
    name: "Campaign localization",
    description:
      "Translate, re-voice, and lip-sync one campaign for multiple markets while preserving the original edit.",
    category: "Video",
    workflows: ["Transcribe", "Translate", "Lip sync"],
    duration: "18 min",
    cost: "$1.20–$2.80",
    runs: "946 runs",
    image: "/generated/2026-07-24-004043/salt-signal-wide.webp",
  },
  {
    name: "Product photo to 3D",
    description:
      "Convert a clean product photo into a textured 3D asset and a platform-ready turntable video.",
    category: "Product",
    workflows: ["Remove background", "Image to 3D", "Turntable"],
    duration: "5 min",
    cost: "$0.30–$0.60",
    runs: "783 runs",
    image: "/container-thumbnails/20260724-002929/ai-runner.webp",
  },
  {
    name: "Data to explainer",
    description:
      "Transform a structured brief into a narrated video with exact figures, animated charts, and readable overlays.",
    category: "Brand",
    workflows: ["Storyboard", "Data overlays", "Narration"],
    duration: "15 min",
    cost: "$0.80–$1.60",
    runs: "621 runs",
    image: "/generated/2026-07-24-004043/after-hours-wide.webp",
  },
  {
    name: "Podcast to social clips",
    description:
      "Find the strongest moments in an episode and publish captioned clips, audiograms, and quote cards.",
    category: "Creator",
    workflows: ["Transcribe", "Find highlights", "Social exports"],
    duration: "20 min",
    cost: "$0.80–$1.80",
    runs: "1.2K runs",
    image: "/generated/2026-07-24-142500-slug-gang/scene-05.png",
  },
  {
    name: "Character to animated short",
    description:
      "Lock a character across a storyboard, animate selected shots, and assemble a finished short.",
    category: "Video",
    workflows: ["Character anchor", "Storyboard", "Animate"],
    duration: "30 min",
    cost: "$2.20–$4.00",
    runs: "504 runs",
    image: "/generated/2026-07-24-142500-slug-gang/scene-03.png",
  },
]

const layers = [
  {
    title: "Runner",
    description: "Connects Codex, Cowork, or your application to Livepeer.",
    href: "/mockups/playbooks/install",
  },
  {
    title: "Playbooks",
    description: "Reusable production plans composed from multiple workflows.",
    href: "#playbooks",
  },
  {
    title: "Compute",
    description: "Independent GPU operators execute each workflow run.",
    href: "https://docs.livepeer.org/v1/orchestrators/guides/get-started",
  },
]

const paths = [
  {
    title: "Build with Runner",
    description: "Install Runner and use Livepeer from Codex or Cowork.",
    href: "/mockups/playbooks/install",
    icon: TerminalIcon,
    external: false,
  },
  {
    title: "Provide GPU compute",
    description: "Run an orchestrator and earn fees for completed work.",
    href: "https://docs.livepeer.org/v1/orchestrators/guides/get-started",
    icon: CpuIcon,
    external: true,
  },
  {
    title: "Join the community",
    description: "Meet builders, operators, and contributors in Discord.",
    href: "https://discord.gg/livepeer",
    icon: MessageCircleIcon,
    external: true,
  },
]

const resourceGroups = [
  {
    title: "Build",
    links: [
      { label: "Documentation", href: "https://docs.livepeer.org/" },
      { label: "Ecosystem", href: "https://livepeer.org/ecosystem" },
      { label: "GitHub", href: "https://github.com/livepeer" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Primer", href: "https://livepeer.org/primer" },
      { label: "Roadmap", href: "https://roadmap.livepeer.org/roadmap" },
      { label: "Delegate LPT", href: "https://explorer.livepeer.org/" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/livepeer" },
      { label: "Forum", href: "https://forum.livepeer.org/" },
      { label: "Research", href: "https://forum.livepeer.org/c/research/15" },
    ],
  },
]

export function PlaybooksWorkspace() {
  const [category, setCategory] = useState<Category>("All")

  const visiblePlaybooks = useMemo(
    () =>
      category === "All"
        ? playbooks
        : playbooks.filter((playbook) => playbook.category === category),
    [category]
  )

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-20">
        <div className="max-w-xl">
          <p className="text-sm text-muted-foreground">Livepeer Runner</p>
          <h1 className="mt-3 text-4xl leading-tight font-medium text-balance sm:text-5xl">
            Video infrastructure for agents.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Install one tool to give Codex, Cowork, or your application access
            to reusable video workflows backed by open GPU compute.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="px-5"
              nativeButton={false}
              render={<Link href="/mockups/playbooks/install" />}
            >
              Install Runner
              <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#playbooks" />}
            >
              Browse playbooks
            </Button>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-4xl bg-muted md:min-h-[28rem]">
          <LivepeerSymbol className="absolute top-8 right-8 h-44 w-auto opacity-[0.06] md:hidden" />
          <LivepeerSymbol3D className="[&>canvas]:scale-110" />
          <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-foreground p-5 text-background sm:inset-x-6 sm:bottom-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">Install Runner</p>
              <span className="text-xs text-background/60">Codex · Cowork</span>
            </div>
            <code className="mt-5 block overflow-x-auto pb-1 font-mono text-xs whitespace-nowrap text-background/80">
              npx install @livepeer/runner
            </code>
            <div className="mt-4 flex items-center gap-2 border-t border-background/15 pt-4 text-xs text-background/60">
              <span className="size-1.5 rounded-full bg-background" />
              Connects to this project with OAuth
            </div>
          </div>
        </div>
      </section>

      <section className="border-y">
        <div className="mx-auto grid max-w-6xl px-4 sm:px-6 md:grid-cols-3">
          {layers.map((layer, index) => {
            const content = (
              <>
                <span className="text-xs text-muted-foreground tabular-nums">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="font-medium">{layer.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {layer.description}
                  </p>
                </div>
                <ArrowRightIcon
                  className="mt-0.5 ml-auto size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </>
            )

            return layer.href.startsWith("http") ? (
              <a
                key={layer.title}
                href={layer.href}
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 border-b py-6 last:border-b-0 hover:text-muted-foreground md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                {content}
              </a>
            ) : (
              <Link
                key={layer.title}
                href={layer.href}
                className="flex gap-4 border-b py-6 last:border-b-0 hover:text-muted-foreground md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </section>

      <section
        id="playbooks"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium">Start with a playbook</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Proven production plans composed from reusable workflows.
            </p>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  category === item && "bg-muted font-medium text-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {visiblePlaybooks.map((playbook, index) => (
            <Card key={playbook.name} className="py-0">
              <div className="grid sm:grid-cols-[11rem_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted sm:aspect-auto sm:min-h-72">
                  <Image
                    src={playbook.image}
                    alt=""
                    fill
                    preload={index < 2}
                    className="object-cover"
                    sizes="(min-width: 768px) 176px, 100vw"
                  />
                </div>
                <div className="flex min-w-0 flex-col py-6">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="secondary">{playbook.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {playbook.runs}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-xl">
                      {playbook.name}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {playbook.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-6 flex flex-1 flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      {playbook.workflows.map((workflow) => (
                        <div
                          key={workflow}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckIcon
                            className="size-3.5 text-muted-foreground"
                            aria-hidden="true"
                          />
                          {workflow}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3Icon className="size-3.5" aria-hidden="true" />
                          {playbook.duration}
                        </span>
                        <span>{playbook.cost}</span>
                      </div>
                      <Button
                        size="icon-sm"
                        aria-label={`Use ${playbook.name}`}
                      >
                        <ArrowRightIcon />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-medium">Choose how to participate</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {paths.map((path) => {
              const PathIcon = path.icon
              const content = (
                <Card className="h-full min-h-52 transition-colors group-hover:bg-accent">
                  <CardHeader className="flex h-full flex-col justify-between">
                    <PathIcon
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <CardTitle>{path.title}</CardTitle>
                        {path.external ? (
                          <ArrowUpRightIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <ArrowRightIcon className="size-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardDescription className="mt-2 leading-relaxed">
                        {path.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )

              return path.external ? (
                <a
                  key={path.title}
                  href={path.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1fr_2fr] sm:px-6">
          <div>
            <LivepeerSymbol className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Open video infrastructure powered by independent GPU operators.
            </p>
            <a
              href="https://github.com/livepeer"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <CodeIcon className="size-4" aria-hidden="true" />
              Contribute on GitHub
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {resourceGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-medium">{group.title}</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
