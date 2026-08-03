import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/docs/component-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { Badge } from "@/components/ui/badge"
import {
  getComponentDocumentationSource,
  getDocumentedDependencies,
} from "@/lib/component-docs.server"
import { components, getComponentDoc, registryItemUrl } from "@/lib/docs"

export const dynamicParams = false

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
  const dependencies = getDocumentedDependencies(slug)
  const source = getComponentDocumentationSource(slug)
  if (!source) notFound()

  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      {doc.level && (
        <Badge variant="secondary" className="mt-3 capitalize">
          {doc.level}
        </Badge>
      )}
      <p className="mt-2 text-balance text-muted-foreground">
        {doc.description}
      </p>
      <ComponentPreview name={slug} source={source} className="mt-8" />
      {dependencies.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Built with</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {dependencies.map((dependency) => (
              <Badge
                key={dependency.name}
                variant="outline"
                render={
                  <a href={`/docs/components/${dependency.name}`}>
                    {dependency.title}
                  </a>
                }
              />
            ))}
          </div>
        </section>
      )}
      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl(slug)} />
      </div>
    </article>
  )
}
