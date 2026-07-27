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
        className="group block overflow-hidden rounded-2xl border bg-background transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="relative aspect-[1.91/1] overflow-hidden border-b bg-black">
          <Image
            src="/brand/og.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, calc(100vw - 32px)"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        <div className="space-y-0.5 px-4 py-3.5">
          <p className="text-sm text-muted-foreground">livepeer-ui · Mockup</p>
          <h1 className="text-base font-medium">{product.title}</h1>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>
      </Link>

      <section className="mt-10 text-center">
        <h2 className="text-sm font-medium">Components</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {group.items.map((component) => (
            <Badge
              key={component.name}
              variant="outline"
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
