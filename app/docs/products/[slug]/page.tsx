import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { componentGroups } from "@/lib/docs"

const products = {
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
} as const

type ProductSlug = keyof typeof products

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products[slug as ProductSlug]
  if (!product) return {}

  return {
    title: `${product.title} Components`,
    description: product.description,
  }
}

export default async function ProductComponentsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products[slug as ProductSlug]
  if (!product) notFound()

  const group = componentGroups.find(
    (candidate) => candidate.title === product.title
  )
  if (!group) notFound()

  return (
    <article className="max-w-3xl">
      <Link
        href={product.previewHref}
        target="_blank"
        aria-label={`View the ${product.title} mockup`}
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
            {product.title}
          </h1>
        </div>
        <p className="mt-2 px-0.5 text-xs text-muted-foreground">
          From livepeer-ui
        </p>
      </Link>

      <section className="mt-10 text-center">
        <h2 className="text-sm font-medium">Components</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {group.items.map((component) => (
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
