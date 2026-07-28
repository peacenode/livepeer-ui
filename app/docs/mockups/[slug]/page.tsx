import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { LivepeerGradientSymbol } from "@/components/brand"
import { Badge } from "@/components/ui/badge"
import { componentGroups } from "@/lib/docs"

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
type PrivateBetaSurface = {
  title: string
  href?: string
  components: string[]
}

const privateBetaLandingSurface: PrivateBetaSurface = {
  title: "Agent Landing Page",
  href: "/mockups/private-beta/landing-page",
  components: [
    "livepeer-org-menu",
    "livepeer-org-header",
    "livepeer-org-footer",
    "livepeer-agent-hero",
    "agent-compatibility",
    "agent-access-section",
    "agent-capabilities-section",
    "playbooks-cta-section",
  ],
}

const privateBetaProductSurfaces: PrivateBetaSurface[] = [
  {
    title: "Agent Platform",
    href: "/mockups/private-beta/landing/console",
    components: [
      "livepeer-agent-page-frame",
      "livepeer-agent-sidebar",
      "user-menu",
      "livepeer-agent-auth-gate",
      "livepeer-agent-onboarding-section",
      "playbook-catalog",
    ],
  },
  {
    title: "Render Result",
    components: [
      "livepeer-agent-page-frame",
      "livepeer-agent-sidebar",
      "user-menu",
    ],
  },
]

const privateBetaAccessSurfaces: PrivateBetaSurface[] = [
  {
    title: "Agent Waitlist",
    href: "/mockups/waitlist",
    components: [
      "waitlist-panel",
      "waitlist-signup-form",
      "waitlist-status-card",
      "waitlist-referral-link",
      "waitlist-leaderboard",
      "waitlist-background-hero",
    ],
  },
  {
    title: "Welcome Email",
    href: "/mockups/welcome-email",
    components: ["welcome-email"],
  },
]

const privateBetaMarketingDeployment = {
  title: "Marketing deployment",
  hostname: "earlyaccess.livepeer.org",
  description: "Landing page, waitlist, and welcome email cut over together.",
}

const privateBetaPlatformDeployment = {
  title: "Billing/API Keys",
  hostname: "platform.livepeer.org",
  description: "Billing, credits, API keys, and Playbooks.",
}

const privateBetaAgentDeployment = {
  title: "MCP/Render result",
  hostname: "agent.livepeer.org",
  description:
    "The root forwards to earlyaccess.livepeer.org/waitlist. MCP and rendered output routes remain on agent.livepeer.org.",
}

const privateBetaAgentRoutes = [
  { title: "MCP server", path: "/api/mcp" },
  { title: "Project render result", path: "/v/{id}" },
  { title: "Moodboard result", path: "/m/{id}" },
  { title: "CLI-run result", path: "/preview/{id}" },
  { title: "Shared-session result", path: "/session/{token}" },
]
function MockupEmbed({
  title,
  href,
  priority = false,
  sourceLabel,
}: {
  title: string
  href?: string
  priority?: boolean
  sourceLabel?: string
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
        {sourceLabel ?? (href ? "From livepeer-ui" : "Design pending")}
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
  sourceLabel,
}: {
  surface: PrivateBetaSurface
  className?: string
  sourceLabel?: string
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
          {sourceLabel ??
            (surface.href ? "From livepeer-ui" : "Design pending")}
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
  const privateBetaWaitlistSurface = privateBetaAccessSurfaces.find(
    (page) => page.title === "Agent Waitlist"
  )
  const privateBetaWelcomeEmailSurface = privateBetaAccessSurfaces.find(
    (page) => page.title === "Welcome Email"
  )
  const privateBetaConsoleSurface = privateBetaProductSurfaces.find(
    (page) => page.title === "Agent Platform"
  )
  const privateBetaRenderSurface = privateBetaProductSurfaces.find(
    (page) => page.title === "Render Result"
  )
  const group = componentGroups.find(
    (candidate) => candidate.title === mockup.componentGroup
  )
  if (!group) notFound()

  const componentNames: readonly string[] | undefined =
    slug === "private-beta"
      ? [
          ...new Set(
            [
              privateBetaLandingSurface,
              ...privateBetaProductSurfaces,
              ...privateBetaAccessSurfaces,
            ].flatMap((surface) => surface.components)
          ),
        ]
      : "componentNames" in mockup
        ? mockup.componentNames
        : undefined
  const componentItems = componentNames
    ? group.items.filter((component) => componentNames.includes(component.name))
    : group.items

  return (
    <article className={slug === "private-beta" ? "max-w-5xl" : "max-w-3xl"}>
      <h1 className="sr-only">{mockup.title}</h1>
      {slug === "private-beta" ? (
        <div>
          <section aria-labelledby="marketing-deployment-heading">
            <h2
              id="marketing-deployment-heading"
              className="text-sm font-medium"
            >
              {privateBetaMarketingDeployment.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-balance text-muted-foreground">
              {privateBetaMarketingDeployment.description}
            </p>

            <div className="mt-5 grid w-full max-w-3xl gap-6 md:grid-cols-[minmax(0,32rem)_minmax(12rem,1fr)] md:items-start">
              <div className="w-full max-w-lg">
                <MockupEmbed
                  title={privateBetaLandingSurface.title}
                  href={privateBetaLandingSurface.href}
                  priority
                  sourceLabel={privateBetaMarketingDeployment.hostname}
                />
              </div>
              <div className="flex flex-col gap-4">
                {privateBetaWaitlistSurface && (
                  <ProductSurfaceEmbed
                    surface={privateBetaWaitlistSurface}
                    sourceLabel={`${privateBetaMarketingDeployment.hostname}/waitlist`}
                  />
                )}
                {privateBetaWelcomeEmailSurface && (
                  <ProductSurfaceEmbed
                    surface={privateBetaWelcomeEmailSurface}
                    sourceLabel={`${privateBetaMarketingDeployment.hostname}/waitlist`}
                  />
                )}
              </div>
            </div>
          </section>

          <div className="mt-12 flex flex-col gap-12">
            <section aria-labelledby="platform-deployment-heading">
              <h3
                id="platform-deployment-heading"
                className="text-sm font-medium"
              >
                {privateBetaPlatformDeployment.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                {privateBetaPlatformDeployment.description}
              </p>
              {privateBetaConsoleSurface && (
                <div className="mt-5 w-full max-w-lg">
                  <MockupEmbed
                    title={privateBetaConsoleSurface.title}
                    href={privateBetaConsoleSurface.href}
                    sourceLabel={privateBetaPlatformDeployment.hostname}
                  />
                </div>
              )}
            </section>

            <section aria-labelledby="agent-deployment-heading">
              <h3 id="agent-deployment-heading" className="text-sm font-medium">
                {privateBetaAgentDeployment.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                {privateBetaAgentDeployment.description}
              </p>
              {privateBetaRenderSurface && (
                <div className="mt-5 grid w-full max-w-3xl gap-6 md:grid-cols-[minmax(0,32rem)_minmax(12rem,1fr)] md:items-start">
                  <div className="w-full max-w-lg">
                    <MockupEmbed
                      title={privateBetaRenderSurface.title}
                      href={privateBetaRenderSurface.href}
                      sourceLabel={privateBetaAgentDeployment.hostname}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    {privateBetaAgentRoutes.map((route) => (
                      <ProductSurfaceEmbed
                        key={route.path}
                        surface={{
                          title: route.title,
                          components: privateBetaRenderSurface.components,
                        }}
                        sourceLabel={`${privateBetaAgentDeployment.hostname}${route.path}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
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
