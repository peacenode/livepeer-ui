import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export interface MarketingPlanLink {
  _key: string
  label: string
  href: string
}

export interface MarketingPlanItem {
  _key: string
  title: string
  description: string
  links?: MarketingPlanLink[]
}

export interface MarketingWeek {
  _id: string
  startsAt: string
  outcomes: MarketingPlanItem[]
  outreach: MarketingPlanItem[]
  sources: MarketingPlanItem[]
  note?: string
}

const marketingWeeksQuery = defineQuery(`
  *[_type == "marketingWeek"] | order(startsAt asc) {
    _id,
    startsAt,
    outcomes[] {
      _key,
      title,
      description,
      links[] {
        _key,
        label,
        href
      }
    },
    outreach[] {
      _key,
      title,
      description,
      links[] {
        _key,
        label,
        href
      }
    },
    sources[] {
      _key,
      title,
      description,
      links[] {
        _key,
        label,
        href
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
