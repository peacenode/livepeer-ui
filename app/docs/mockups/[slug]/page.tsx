import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TriangleAlertIcon } from "lucide-react"

import { LivepeerGradientSymbol } from "@/components/brand"
import { Badge } from "@/components/ui/badge"
import { componentGroups } from "@/lib/docs"
import {
  getMockupRoundup,
  type MockupPage as SanityMockupPage,
} from "@/sanity/lib/registry-content"

const mockups = {
  "internal-testing": {
    title: "Internal Testing",
    description:
      "The Agent landing page is exclusively for private marketing and communications during internal testing.",
    previewHref: "/mockups/agent-landing-page",
    componentGroup: "Livepeer.org",
    componentNames: [
      "livepeer-org-menu",
      "livepeer-org-header",
      "livepeer-org-footer",
      "playbooks-cta-section",
      "agent-capabilities-section",
    ],
  },
  "private-beta": {
    title: "Private Beta",
    description:
      "The Agent landing page remains exclusively for private marketing and communications during the private beta.",
    previewHref: "/mockups/private-beta",
    componentGroup: "Livepeer.org",
    componentNames: [
      "livepeer-org-menu",
      "livepeer-org-header",
      "livepeer-org-footer",
      "playbooks-cta-section",
      "agent-capabilities-section",
    ],
  },
  "public-beta": {
    title: "Public Beta",
    description:
      "The complete Livepeer.org public experience across the network, Agent, playbooks, ecosystem, and GPU participation.",
    previewHref: "/mockups/livepeer-org",
    componentGroup: "Livepeer.org",
  },
  "agent-landing-page": {
    title: "Agent Landing Page",
    description:
      "The Agent landing page is exclusively for private marketing and communications during internal testing.",
    previewHref: "/mockups/agent-landing-page",
    componentGroup: "Livepeer.org",
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
    componentGroup: "Agent Waitlist",
    componentNames: ["welcome-email"],
  },
  "agent-waitlist": {
    title: "Agent Waitlist",
    description:
      "Signup, referral, status, leaderboard, and branded background components for the Agent Waitlist.",
    previewHref: "/mockups/waitlist",
    componentGroup: "Agent Waitlist",
  },
  "agent-console": {
    title: "Agent Console",
    description:
      "Application shell, account, usage, billing, API, inference, and compute components for the Agent Console.",
    previewHref: "/mockups/livepeer-agent",
    componentGroup: "Agent Console",
  },
  "livepeer-org": {
    title: "Livepeer.org",
    description:
      "Navigation, landing, Agent, playbook, ecosystem, and network sections used across Livepeer.org.",
    previewHref: "/mockups/livepeer-org",
    componentGroup: "Livepeer.org",
  },
} as const

type MockupSlug = keyof typeof mockups
function MockupEmbed({
  title,
  href,
  priority = false,
}: {
  title: string
  href?: string
  priority?: boolean
}) {
  const preview = (
    <>
      <div className="relative aspect-[1.91/1] overflow-hidden rounded-2xl border bg-black">
        <Image
          src="/brand/og.png"
          alt=""
          fill
          priority={priority}
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
        <span className="absolute bottom-4 left-4 rounded-sm bg-black/60 px-2 py-1 text-sm font-semibold text-white backdrop-blur-sm">
          {title}
        </span>
      </div>
      <p className="mt-2 px-0.5 text-xs text-muted-foreground">
        {href ? "From livepeer-ui" : "Design pending"}
      </p>
    </>
  )

  return href ? (
    <Link
      href={href}
      target="_blank"
      aria-label={`Open the ${title} mockup`}
      className="block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {preview}
    </Link>
  ) : (
    <div>{preview}</div>
  )
}

function ProductSurfaceEmbed({
  surface,
  className = "",
}: {
  surface: SanityMockupPage
  className?: string
}) {
  const content = (
    <>
      <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border bg-black sm:size-24">
        <LivepeerGradientSymbol
          className="h-8 w-auto sm:h-10"
          aria-hidden="true"
        />
      </div>
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        <span className="text-sm font-semibold text-foreground">
          {surface.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {surface.href ? "From livepeer-ui" : "Design pending"}
        </span>
      </div>
    </>
  )

  return surface.href ? (
    <Link
      href={surface.href}
      target="_blank"
      aria-label={`Open the ${surface.title} mockup`}
      className={`flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      {content}
    </Link>
  ) : (
    <div className={`flex items-center gap-3 ${className}`}>{content}</div>
  )
}

function isMockupSlug(slug: string): slug is MockupSlug {
  return slug in mockups
}

export function generateStaticParams() {
  return Object.keys(mockups).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!isMockupSlug(slug)) return {}

  if (slug === "private-beta") {
    const roundup = await getMockupRoundup("private-beta")
    if (!roundup) return {}
    return {
      title: roundup.title,
      description: roundup.description,
    }
  }

  return {
    title: mockups[slug].title,
    description: mockups[slug].description,
  }
}

export default async function MockupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isMockupSlug(slug)) notFound()

  const mockup = mockups[slug]
  const privateBetaRoundup =
    slug === "private-beta" ? await getMockupRoundup("private-beta") : null

  if (slug === "private-beta" && !privateBetaRoundup) {
    throw new Error(
      'Required Sanity document "mockupRoundup-private-beta" is missing.'
    )
  }

  const privateBetaLandingSurface = privateBetaRoundup?.pages.find(
    (page) => page.title === "Agent Landing Page"
  )
  const privateBetaProductSurfaces =
    privateBetaRoundup?.pages.filter((page) =>
      ["Agent Console", "Render Result"].includes(page.title)
    ) ?? []
  const privateBetaAccessSurfaces =
    privateBetaRoundup?.pages.filter((page) =>
      ["Agent Waitlist", "Welcome Email"].includes(page.title)
    ) ?? []
  const privateBetaWaitlistSurface = privateBetaAccessSurfaces.find(
    (page) => page.title === "Agent Waitlist"
  )
  const privateBetaWelcomeEmailSurface = privateBetaAccessSurfaces.find(
    (page) => page.title === "Welcome Email"
  )
  const group = componentGroups.find(
    (candidate) => candidate.title === mockup.componentGroup
  )
  if (!group) notFound()

  const componentNames: readonly string[] | undefined = privateBetaRoundup
    ? [...new Set(privateBetaRoundup.pages.flatMap((page) => page.components))]
    : "componentNames" in mockup
      ? mockup.componentNames
      : undefined
  const componentItems = componentNames
    ? group.items.filter((component) =>
        componentNames.includes(component.name)
      )
    : group.items

  return (
    <article className={slug === "private-beta" ? "max-w-5xl" : "max-w-3xl"}>
      <h1 className="sr-only">{mockup.title}</h1>
      {slug === "private-beta" ? (
        <div>
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(12rem,1fr)] md:items-start">
            <div>
              {privateBetaLandingSurface && (
                <MockupEmbed
                  title={privateBetaLandingSurface.title}
                  href={privateBetaLandingSurface.href}
                  priority
                />
              )}
            </div>

            <section
              aria-labelledby="unlisted-products-heading"
            >
              <h2
                id="unlisted-products-heading"
                className="mb-4 flex items-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400"
              >
                <TriangleAlertIcon
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <span>Unlisted product surface area</span>
              </h2>
              <div className="flex flex-col gap-4 text-left">
                {privateBetaProductSurfaces.map((surface) => (
                  <ProductSurfaceEmbed
                    key={surface.title}
                    surface={surface}
                  />
                ))}
              </div>
            </section>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-balance text-muted-foreground">
            {privateBetaRoundup?.description}
          </p>

          <section aria-labelledby="agent-waitlist-heading" className="mt-10">
            <h2
              id="agent-waitlist-heading"
              className="mb-4 text-center text-sm font-medium"
            >
              Agent Waitlist
            </h2>
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(12rem,1fr)] md:items-start">
              {privateBetaWaitlistSurface && (
                <MockupEmbed
                  title={privateBetaWaitlistSurface.title}
                  href={privateBetaWaitlistSurface.href}
                />
              )}
              {privateBetaWelcomeEmailSurface && (
                <ProductSurfaceEmbed
                  surface={privateBetaWelcomeEmailSurface}
                />
              )}
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-lg">
            <MockupEmbed
              title={mockup.title}
              href={mockup.previewHref}
              priority
            />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-balance text-muted-foreground">
            {mockup.description}
          </p>
        </>
      )}

      <section className="mt-10 text-center">
        <h2 className="text-sm font-medium">Components in use</h2>
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

        <h2 className="mt-8 text-sm font-medium">Content</h2>
        <div className="mt-4">
          <Badge
            variant="outline"
            className="h-auto rounded-sm px-3 py-2 font-normal"
            render={
              <Link href="/studio" target="_blank">
                Edit content in Sanity
              </Link>
            }
          />
        </div>
      </section>
    </article>
  )
}
