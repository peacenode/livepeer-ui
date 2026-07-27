import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type PlannerDocumentKind = "internal-meeting" | "user-interview"

export interface PlannerLink {
  _key: string
  label: string
  href: string
}

export interface PlannerReference {
  _id: string
  title: string
  description: string
  links: PlannerLink[]
}

export interface PlannerDocumentSummary {
  _id: string
  kind: PlannerDocumentKind
  title: string
  slug: string
  occurredAt?: string
  summary?: string
}

export interface PlannerDocument extends PlannerDocumentSummary {
  markdownFile: {
    url: string
    originalFilename?: string
  }
}

const referencesQuery = defineQuery(`
  {
    "outreach": *[_type == "plannerOutreach"] | order(_createdAt desc) {
      _id, title, description,
      "links": coalesce(links[]{_key, label, href}, [])
    },
    "constraints": *[_type == "plannerConstraint"] | order(_createdAt desc) {
      _id, title, description,
      "links": coalesce(links[]{_key, label, href}, [])
    },
    "documents": *[_type == "plannerMarkdownDocument"] |
      order(occurredAt desc, _createdAt desc) {
        _id, kind, title, "slug": slug.current, occurredAt, summary
      }
  }
`)

const documentQuery = defineQuery(`
  *[
    _type == "plannerMarkdownDocument" &&
    kind == $kind &&
    slug.current == $slug
  ][0] {
    _id, kind, title, "slug": slug.current, occurredAt, summary,
    "markdownFile": markdownFile.asset->{url, originalFilename}
  }
`)

const options = {
  next: { revalidate: 60, tags: ["planner-content"] },
}

export function getPlannerContent() {
  return sanityClient.fetch<{
    outreach: PlannerReference[]
    constraints: PlannerReference[]
    documents: PlannerDocumentSummary[]
  }>(referencesQuery, {}, options)
}

export function getPlannerDocument(kind: PlannerDocumentKind, slug: string) {
  return sanityClient.fetch<PlannerDocument | null>(
    documentQuery,
    { kind, slug },
    options
  )
}
