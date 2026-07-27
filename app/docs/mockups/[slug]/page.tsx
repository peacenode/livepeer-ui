import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { componentGroups } from "@/lib/docs"
import {
  getMockupRoundup,
  type MockupRoundupSlug,
} from "@/sanity/lib/registry-content"

const mockupRoundupSlugs = [
  "agent-waitlist",
  "agent-console",
  "livepeer-org",
] as const satisfies readonly MockupRoundupSlug[]

const componentGroupTitles: Record<MockupRoundupSlug, string> = {
  "agent-waitlist": "Agent Waitlist",
  "agent-console": "Agent Console",
  "livepeer-org": "Livepeer.org",
}

function isMockupRoundupSlug(slug: string): slug is MockupRoundupSlug {
  return mockupRoundupSlugs.some((candidate) => candidate === slug)
}

export function generateStaticParams() {
  return mockupRoundupSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!isMockupRoundupSlug(slug)) return {}

  const roundup = await getMockupRoundup(slug)
  if (!roundup) return {}

  return {
    title: `${roundup.title} Components`,
    description: roundup.description,
  }
}

export default async function MockupRoundupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isMockupRoundupSlug(slug)) notFound()

  const roundup = await getMockupRoundup(slug)
  if (!roundup) notFound()

  const group = componentGroups.find(
    (candidate) => candidate.title === componentGroupTitles[slug]
  )
  if (!group) notFound()

  const componentsByName = new Map(
    group.items.map((component) => [component.name, component])
  )
  const pages = roundup.pages.map((page) => ({
    ...page,
    components: page.components.map((name) => {
      const component = componentsByName.get(name)
      if (!component) notFound()
      return component
    }),
  }))
  if (pages.length === 0) notFound()

  return (
    <article className="max-w-3xl">
      <Link
        href={roundup.previewHref}
        target="_blank"
        aria-label={`View the ${roundup.title} mockup`}
        className="mx-auto block max-w-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="relative aspect-[1.91/1] overflow-hidden rounded-2xl border bg-black">
          <Image
            src="/brand/og.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 512px, calc(100vw - 32px)"
            className="scale-90 object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at bottom left, color-mix(in oklab, var(--color-emerald-500) 65%, transparent) 0%, color-mix(in oklab, var(--color-emerald-500) 20%, transparent) 22%, transparent 48%)",
            }}
          />
          <h1 className="absolute bottom-4 left-4 rounded-sm bg-black/60 px-2 py-1 text-sm font-normal text-white backdrop-blur-sm sm:bottom-5 sm:left-5">
            {roundup.title}
          </h1>
        </div>
        <p className="mt-2 px-0.5 text-xs text-muted-foreground">
          From livepeer-ui
        </p>
      </Link>

      <p className="mx-auto mt-6 max-w-xl text-center text-sm text-balance text-muted-foreground">
        {roundup.description}
      </p>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4 border-b pb-3">
          <h2 className="text-sm font-medium">Pages</h2>
          <Badge
            variant="outline"
            className="h-auto rounded-sm px-2.5 py-1.5 font-normal"
            render={
              <Link href="/studio" target="_blank">
                Edit in Sanity Studio
              </Link>
            }
          />
        </div>

        <div className="divide-y border-b">
          {pages.map((page) => (
            <article key={page._key} className="py-6">
              <h3 className="font-medium">
                <Link
                  href={page.href}
                  target="_blank"
                  className="hover:underline"
                >
                  {page.title}
                </Link>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.components.map((component) => (
                  <Badge
                    key={component.name}
                    variant="secondary"
                    className="h-auto rounded-sm px-2.5 py-1.5 font-normal"
                    render={
                      <Link href={`/docs/components/${component.name}`}>
                        {component.title}
                      </Link>
                    }
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
