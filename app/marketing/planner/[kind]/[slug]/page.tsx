import type { Metadata } from "next"
import MarkdownIt from "markdown-it"
import { notFound } from "next/navigation"

import { MarkdownDocument } from "@/components/marketing/markdown-document"
import {
  getPlannerDocument,
  type PlannerDocumentKind,
} from "@/sanity/lib/planner-content"

const kinds = new Set<PlannerDocumentKind>([
  "internal-meeting",
  "user-interview",
])

function isPlannerDocumentKind(value: string): value is PlannerDocumentKind {
  return kinds.has(value as PlannerDocumentKind)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>
}): Promise<Metadata> {
  const { kind, slug } = await params
  if (!isPlannerDocumentKind(kind)) return {}
  const document = await getPlannerDocument(kind, slug)
  return document
    ? { title: document.title, description: document.summary }
    : {}
}

export default async function PlannerDocumentPage({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>
}) {
  const { kind, slug } = await params
  if (!isPlannerDocumentKind(kind)) notFound()

  const document = await getPlannerDocument(kind, slug)
  if (!document?.markdownFile?.url) notFound()

  const response = await fetch(document.markdownFile.url, {
    next: { revalidate: 60, tags: ["planner-content"] },
  })
  if (!response.ok) notFound()

  const markdown = await response.text()
  const html = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
  }).render(markdown)

  return (
    <MarkdownDocument
      title={document.title}
      summary={document.summary}
      occurredAt={document.occurredAt}
      html={html}
    />
  )
}
