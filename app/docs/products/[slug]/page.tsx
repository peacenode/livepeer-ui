import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDocumentedDependencies } from "@/lib/component-docs.server"
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
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {product.title}
          </h1>
          <p className="mt-2 max-w-2xl text-balance text-muted-foreground">
            {product.description}
          </p>
        </div>
        <Button
          variant="outline"
          render={
            <Link href={product.previewHref} target="_blank">
              View page
              <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          }
        />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        <div className="mt-4 divide-y border-y">
          {group.items.map((component) => {
            const dependencies = getDocumentedDependencies(component.name)

            return (
              <div key={component.name} className="py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/docs/components/${component.name}`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {component.title}
                  </Link>
                  {component.level && (
                    <Badge variant="secondary" className="capitalize">
                      {component.level}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {component.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Uses
                  </span>
                  {dependencies.length > 0 ? (
                    dependencies.map((dependency) => (
                      <Badge
                        key={dependency.name}
                        variant="outline"
                        render={
                          <Link href={`/docs/components/${dependency.name}`}>
                            {dependency.title}
                          </Link>
                        }
                      />
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">None</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </article>
  )
}
