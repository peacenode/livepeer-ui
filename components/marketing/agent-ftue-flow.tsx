"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Check, TriangleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  AgentRolloutFlow,
  AgentRolloutScreen,
} from "@/sanity/lib/agent-rollout-flow"

function ScreenRow({
  screen,
  headingId,
}: {
  screen: AgentRolloutScreen
  headingId: string
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)] lg:items-start"
    >
      <div className="min-w-0">
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
          <div className="relative aspect-video">
            <Image
              src={screen.imageUrl}
              alt={screen.imageAlt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              style={
                screen.imageHotspot
                  ? {
                      objectPosition: `${screen.imageHotspot.x * 100}% ${screen.imageHotspot.y * 100}%`,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>

      <aside>
        <h4 id={headingId} className="font-sans text-lg font-medium">
          {screen.title}
        </h4>
        {screen.mockupHref && (
          <a
            href={screen.mockupHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Open mockup
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        )}

        <ul className="mt-5 space-y-3">
          {screen.needs.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-5">
              <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

export function AgentFtueFlow({ content }: { content: AgentRolloutFlow }) {
  const [activePhase, setActivePhase] = useState(0)
  const phase = content.phases[activePhase] ?? content.phases[0]

  if (!phase) return null

  const marketingScreens = phase.screens.filter(
    (screen) => screen.section === "marketing"
  )
  const userFlowScreens = phase.screens.filter(
    (screen) => screen.section === "userFlow"
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:py-12 lg:px-10">
        <header className="mb-8">
          <h1 className="text-3xl font-normal tracking-tight">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {content.subtitle}
          </p>
        </header>

        <Tabs
          value={String(activePhase)}
          onValueChange={(value) => setActivePhase(Number(value))}
        >
          <TabsList aria-label="Rollout phases">
            {content.phases.map((item, index) => (
              <TabsTrigger key={item._key} value={String(index)}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <section className="py-8">
          <h2 className="font-sans text-2xl font-normal tracking-tight">
            {phase.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {phase.summary}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span>Primary CTA</span>
            <Badge>{phase.primaryCta}</Badge>
          </div>
          {phase.callout && (
            <div className="mt-4 flex max-w-3xl items-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{phase.callout}</span>
            </div>
          )}

          {marketingScreens.length > 0 && (
            <section
              aria-labelledby={`marketing-pages-${activePhase}`}
              className="mt-10"
            >
              <h3
                id={`marketing-pages-${activePhase}`}
                className="font-sans text-2xl font-normal tracking-tight"
              >
                Marketing pages
              </h3>
              <div className="mt-8 space-y-10">
                {marketingScreens.map((screen) => (
                  <ScreenRow
                    key={screen._key}
                    screen={screen}
                    headingId={`screen-${activePhase}-${screen._key}`}
                  />
                ))}
              </div>
            </section>
          )}

          {userFlowScreens.length > 0 && (
            <section
              aria-labelledby={`user-flow-${activePhase}`}
              className="mt-16"
            >
              <h3
                id={`user-flow-${activePhase}`}
                className="font-sans text-2xl font-normal tracking-tight"
              >
                User flow
              </h3>
              <div className="mt-8 space-y-10">
                {userFlowScreens.map((screen) => (
                  <ScreenRow
                    key={screen._key}
                    screen={screen}
                    headingId={`screen-${activePhase}-${screen._key}`}
                  />
                ))}
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}
