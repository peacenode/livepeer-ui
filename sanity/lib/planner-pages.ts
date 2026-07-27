import { cache } from "react"
import { defineQuery } from "next-sanity"

import type {
  PlannerPageContent,
  PlannerPageName,
} from "@/components/mockups/contracts"
import { sanityClient } from "@/sanity/lib/client"

export type {
  PlannerPageContent,
  PlannerPageName,
  PlannerProtocolIcon,
} from "@/components/mockups/contracts"

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
