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
  constraints: MarketingPlanItem[]
  internalMeetings: MarketingWeekDocument[]
  userInterviews: MarketingWeekDocument[]
  note?: string
}

export interface MarketingWeekDocument {
  _id: string
  title: string
  slug: string
  occurredAt?: string
  summary?: string
}

const marketingWeeksQuery = defineQuery(`
  *[_type == "marketingWeek"] | order(startsAt asc) {
    _id,
    startsAt,
    "outcomes": coalesce(outcomes[] {
      _key,
      title,
      description,
      links[] {
        _key,
        label,
        href
      }
    }, []),
    "constraints": coalesce(constraints[]-> {
      "_key": _id,
      title,
      description,
      links[] {
        _key,
        label,
        href
      }
    }, []),
    "internalMeetings": coalesce(internalMeetings[]-> {
      _id, title, "slug": slug.current, occurredAt, summary
    }, []),
    "userInterviews": coalesce(userInterviews[]-> {
      _id, title, "slug": slug.current, occurredAt, summary
    }, []),
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
