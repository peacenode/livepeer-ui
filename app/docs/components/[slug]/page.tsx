import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/docs/component-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { components, getComponentDoc, registryItemUrl } from "@/lib/docs"

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) notFound()

  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        {doc.description}
      </p>
      <ComponentPreview name={slug} className="mt-8" />
      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl(slug)} />
      </div>
    </article>
  )
}
