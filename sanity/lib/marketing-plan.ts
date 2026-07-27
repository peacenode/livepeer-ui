import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export interface MarketingPlanLink {
  _key: string
  label: string
  href: string
}

export interface MarketingPlanDeliverable {
  _key: string
  title: string
  links?: MarketingPlanLink[]
}

export interface MarketingPlanGroup {
  _key: string
  title?: string
  deliverables: MarketingPlanDeliverable[]
}

export interface MarketingWeek {
  _id: string
  startsAt: string
  outcome?: string
  groups: MarketingPlanGroup[]
  note?: string
}

const marketingWeeksQuery = defineQuery(`
  *[_type == "marketingWeek"] | order(startsAt asc) {
    _id,
    startsAt,
    outcome,
    groups[] {
      _key,
      title,
      deliverables[] {
        _key,
        title,
        links[] {
          _key,
          label,
          href
        }
      }
    },
    note
  }
`)

export function getMarketingWeeks() {
  return sanityClient.fetch<MarketingWeek[]>(
    marketingWeeksQuery,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["marketing-planner"],
      },
    }
  )
}
