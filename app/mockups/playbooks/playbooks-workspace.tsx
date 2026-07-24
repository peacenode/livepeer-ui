"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  Clock3Icon,
  PlusIcon,
  WorkflowIcon,
} from "lucide-react"

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

const steps = [
  {
    title: "Choose a playbook",
    description: "Start from a proven sequence of workflows.",
  },
  {
    title: "Add your brief",
    description: "Provide the project inputs once.",
  },
  {
    title: "Run with Runner",
    description: "Review the plan and cost before execution.",
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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Runner</p>
          <h1 className="mt-2 text-3xl font-medium text-balance sm:text-4xl">
            Start with a complete production plan.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Playbooks chain reusable workflows into a finished deliverable.
            Choose one, add a brief, then run it from Codex, Cowork, or your
            application.
          </p>
        </div>
        <Button size="lg" className="self-start px-5 font-medium sm:self-auto">
          <PlusIcon />
          Create playbook
        </Button>
      </section>

      <section className="mt-12 border-y">
        <h2 className="sr-only">How playbooks work</h2>
        <div className="grid md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-4 border-b py-5 last:border-b-0 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs tabular-nums">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-medium">Playbooks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Curated recipes built from Runner workflows.
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

        <div className="mt-6 grid gap-4 md:grid-cols-2">
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

      <section className="mt-12 flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <WorkflowIcon
            className="mt-0.5 size-5 text-muted-foreground"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-medium">Build from workflows</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Combine the workflows in your project into a reusable playbook.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/mockups/platform/workflows" />}
        >
          View workflows
          <ArrowRightIcon />
        </Button>
      </section>
    </main>
  )
}
