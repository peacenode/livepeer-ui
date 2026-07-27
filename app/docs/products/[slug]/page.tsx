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
        className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="relative aspect-[1.91/1] overflow-hidden rounded-2xl border bg-black">
          <Image
            src="/brand/og.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, calc(100vw - 32px)"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <h1 className="absolute bottom-4 left-4 rounded-md bg-black/90 px-3 py-1.5 text-lg font-medium text-white sm:bottom-5 sm:left-5 sm:text-2xl">
            {product.title}
          </h1>
        </div>
        <p className="mt-2 px-0.5 text-base text-muted-foreground sm:text-lg">
          From livepeer-ui
        </p>
      </Link>

      <section className="flex flex-col items-center py-24 text-center sm:py-32">
        <h2 className="max-w-2xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
          Components used to build {product.title}.
        </h2>
        <div className="mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
          {group.items.map((component) => (
            <Badge
              key={component.name}
              variant="secondary"
              className="rounded-sm px-3 py-2 font-normal"
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
