import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRightIcon } from "lucide-react"

import { ComponentPreview } from "@/components/docs/component-preview"
import { InstallCommand } from "@/components/docs/install-command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
      {doc.level && (
        <Badge variant="secondary" className="mt-3 capitalize">
          {doc.level}
        </Badge>
      )}
      <p className="mt-2 text-muted-foreground text-balance">
        {doc.description}
      </p>
      {doc.level === "primitive" ? (
        <ComponentPreview name={slug} className="mt-8" />
      ) : doc.previewPath ? (
        <div className="mt-8 flex min-h-48 items-center justify-center rounded-lg border bg-muted/20 p-6 text-center">
          <div className="max-w-sm">
            <p className="text-sm text-muted-foreground text-balance">
              View this {doc.level} in its full responsive product context.
            </p>
            <Button
              className="mt-4"
              nativeButton={false}
              render={<Link href={doc.previewPath} target="_blank" />}
            >
              Open preview
              <ArrowUpRightIcon />
            </Button>
          </div>
        </div>
      ) : null}
      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl(slug)} />
      </div>
    </article>
  )
}
