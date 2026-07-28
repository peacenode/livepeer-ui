"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Check, TriangleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  AgentRolloutFlow,
  AgentRolloutItem,
} from "@/sanity/lib/agent-rollout-flow"

function FlowItem({
  item,
  headingId,
  preload = false,
}: {
  item: AgentRolloutItem
  headingId: string
  preload?: boolean
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)] lg:items-start lg:gap-8"
    >
      <div className="min-w-0">
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="relative aspect-video">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              preload={preload}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              style={
                item.imageHotspot
                  ? {
                      objectPosition: `${item.imageHotspot.x * 100}% ${item.imageHotspot.y * 100}%`,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>

      <aside>
        <h4 id={headingId} className="font-sans text-lg font-medium">
          {item.title}
        </h4>
        {item.mockupHref && (
          <a
            href={item.mockupHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Open mockup
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        )}

        <ul className="mt-5 space-y-3">
          {item.checklist.map((checklistItem) => (
            <li
              key={checklistItem}
              className="flex gap-2.5 text-sm leading-5"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{checklistItem}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

function MarketingPage({
  page,
  headingId,
  preload,
}: {
  page: AgentRolloutItem
  headingId: string
  preload: boolean
}) {
  return <FlowItem item={page} headingId={headingId} preload={preload} />
}

function UserFlowStep({
  step,
  headingId,
}: {
  step: AgentRolloutItem
  headingId: string
}) {
  return <FlowItem item={step} headingId={headingId} />
}

export function AgentFtueFlow({ content }: { content: AgentRolloutFlow }) {
  const [activePhase, setActivePhase] = useState(0)
  const phase = content.phases[activePhase] ?? content.phases[0]

  if (!phase) return null

  return (
    <article className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {content.title}
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          {content.subtitle}
        </p>
      </header>

      <Tabs
        value={String(activePhase)}
        onValueChange={(value) => setActivePhase(Number(value))}
      >
        <div className="max-w-full overflow-x-auto pb-1">
          <TabsList aria-label="Rollout phases">
            {content.phases.map((item, index) => (
              <TabsTrigger key={item._key} value={String(index)}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <section className="py-8">
        <h2 className="font-sans text-2xl font-normal tracking-tight">
          {phase.name}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {phase.description}
        </p>
        {phase.primaryCta && (
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span>Primary CTA</span>
            <Badge>{phase.primaryCta}</Badge>
          </div>
        )}
        {phase.doNotWarning && (
          <div className="mt-4 flex max-w-3xl items-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <span>{phase.doNotWarning}</span>
          </div>
        )}

        {phase.marketingPages.length > 0 && (
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
              {phase.marketingPages.map((page, index) => (
                <MarketingPage
                  key={page._key}
                  page={page}
                  preload={index === 0}
                  headingId={`marketing-page-${activePhase}-${page._key}`}
                />
              ))}
            </div>
          </section>
        )}

        {phase.userFlow.length > 0 && (
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
            <div className="mt-8 space-y-16 sm:space-y-20">
              {phase.userFlow.map((step) => (
                <UserFlowStep
                  key={step._key}
                  step={step}
                  headingId={`user-flow-step-${activePhase}-${step._key}`}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </article>
  )
}
