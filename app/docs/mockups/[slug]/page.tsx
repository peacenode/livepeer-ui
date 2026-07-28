import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { componentGroups } from "@/lib/docs"

type MockupRoundupSlug =
  | "agent-landing-page"
  | "welcome-email"
  | "agent-waitlist"
  | "agent-console"
  | "livepeer-org"

const mockupRoundupSlugs = [
  "agent-landing-page",
  "welcome-email",
  "agent-waitlist",
  "agent-console",
  "livepeer-org",
] as const satisfies readonly MockupRoundupSlug[]

const componentGroupTitles: Record<MockupRoundupSlug, string> = {
  "agent-landing-page": "Livepeer.org",
  "welcome-email": "Agent Waitlist",
  "agent-waitlist": "Agent Waitlist",
  "agent-console": "Agent Console",
  "livepeer-org": "Livepeer.org",
}

const mockupRoundups: Record<
  MockupRoundupSlug,
  {
    title: string
    description: string
    previewHref: string
    componentNames?: readonly string[]
  }
> = {
  "agent-landing-page": {
    title: "Agent Landing Page",
    description:
      "Early-access landing page combining Livepeer.org navigation, Agent branding, playbooks, capabilities, and the complete site footer.",
    previewHref: "/mockups/agent-landing-page",
    componentNames: [
      "livepeer-org-menu",
      "livepeer-org-header",
      "livepeer-org-footer",
      "playbooks-cta-section",
      "agent-capabilities-section",
    ],
  },
  "welcome-email": {
    title: "Welcome Email",
    description:
      "Private beta welcome email with Livepeer Agent branding, onboarding copy, and a single install action.",
    previewHref: "/mockups/welcome-email",
    componentNames: ["welcome-email"],
  },
  "agent-waitlist": {
    title: "Agent Waitlist",
    description:
      "Signup, referral, status, leaderboard, and branded background components for the Agent Waitlist.",
    previewHref: "/mockups/waitlist",
  },
  "agent-console": {
    title: "Agent Console",
    description:
      "Application shell, account, usage, billing, API, inference, and compute components for the Agent Console.",
    previewHref: "/mockups/livepeer-agent",
  },
  "livepeer-org": {
    title: "Livepeer.org",
    description:
      "Navigation, landing, Agent, playbook, ecosystem, and network sections used across Livepeer.org.",
    previewHref: "/mockups/livepeer-org",
  },
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

  const roundup = mockupRoundups[slug]

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

  const roundup = mockupRoundups[slug]

  const group = componentGroups.find(
    (candidate) => candidate.title === componentGroupTitles[slug]
  )
  if (!group) notFound()
  const componentItems = roundup.componentNames
    ? group.items.filter((component) =>
        roundup.componentNames?.includes(component.name)
      )
    : group.items

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

      <section className="mt-10 text-center">
        <h2 className="text-sm font-medium">Components</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {componentItems.map((component) => (
            <Badge
              key={component.name}
              variant="secondary"
              className="h-auto rounded-sm px-3 py-2 font-normal"
              render={
                <Link href={`/docs/components/${component.name}`}>
                  {component.title}
                </Link>
              }
            />
          ))}
        </div>
      </section>
    </article>
  )
}
