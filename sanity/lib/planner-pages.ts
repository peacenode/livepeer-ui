import { cache } from "react"
import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type PlannerPageName =
  | "home"
  | "characters"
  | "footage"
  | "install"
  | "projects"
  | "protocol"
  | "storyboards"

export type PlannerProtocolIcon = "play" | "blocks" | "cpu"

export interface PlannerPageContent {
  _id: string
  _type: "plannerPageContent"
  page: PlannerPageName
  metadataTitle: string
  heading?: string
  description?: string
  primaryActionLabel?: string
  emptyStateTitle?: string
  supportingText?: string
  protocol?: {
    eyebrow: string
    flowHeading: string
    layers: {
      _key: string
      number: string
      title: string
      description: string
      detail: string
      href: string
      icon: PlannerProtocolIcon
    }[]
    requestHeading: string
    requestSteps: { _key: string; title: string; description: string }[]
    agentPropertyHeading: string
    agentPropertyDescription: string
    paymentPropertyHeading: string
    paymentPropertyDescription: string
    architectureLinkLabel: string
    architectureLinkHref: string
  }
}

const query = defineQuery(`
  *[_type == "plannerPageContent" && _id == $id][0] {
    _id, _type, page, metadataTitle, heading, description, primaryActionLabel,
    emptyStateTitle, supportingText,
    protocol {
      eyebrow, flowHeading,
      layers[] { _key, number, title, description, detail, href, icon },
      requestHeading,
      requestSteps[] { _key, title, description },
      agentPropertyHeading, agentPropertyDescription,
      paymentPropertyHeading, paymentPropertyDescription,
      architectureLinkLabel, architectureLinkHref
    }
  }
`)

export const getPlannerPageContent = cache(async (page: PlannerPageName) => {
  const content = await sanityClient.fetch<PlannerPageContent | null>(
    query,
    { id: `plannerPageContent-${page}` },
    { next: { revalidate: 60, tags: ["planner-page-content", page] } }
  )

  if (!content) {
    throw new Error(
      `Missing required Sanity document "plannerPageContent-${page}"`
    )
  }

  return content
})
