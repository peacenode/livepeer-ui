import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type MockupRoundupSlug =
  "agent-waitlist" | "agent-console" | "livepeer-org"

export interface MockupRoundup {
  _id: string
  slug: MockupRoundupSlug
  title: string
  description: string
  previewHref: string
}

export type AgentConsoleEditorialPageName = "usage" | "billing"

export interface RegistryCta {
  _key: string
  label: string
  href: string
}

export interface AgentConsoleEditorialPage {
  _id: string
  page: AgentConsoleEditorialPageName
  heading: string
  description: string
  ctas: RegistryCta[]
  usageContent: {
    overviewTabLabel: string
    activityTabLabel: string
    upgradeTitle: string
    upgradeDescription: string
    dailyUsageTitle: string
    dailyUsageEmptyMessage: string
    resourceUsageTitle: string
    resourceUsageEmptyMessage: string
  } | null
}

const mockupRoundupQuery = defineQuery(`
  *[_type == "mockupRoundup" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    description,
    usageContent {
      overviewTabLabel,
      activityTabLabel,
      upgradeTitle,
      upgradeDescription,
      dailyUsageTitle,
      dailyUsageEmptyMessage,
      resourceUsageTitle,
      resourceUsageEmptyMessage
    },
    previewHref
  }
`)

const agentConsoleEditorialPageQuery = defineQuery(`
  *[_type == "agentConsoleEditorialPage" && page == $page][0] {
    _id,
    page,
    heading,
    description,
    "ctas": coalesce(
      ctas[] {
        _key,
        label,
        href
      },
      []
    )
  }
`)

const registryContentFetchOptions = {
  next: {
    revalidate: 60,
    tags: ["registry-content"],
  },
}

export function getMockupRoundup(slug: MockupRoundupSlug) {
  return sanityClient.fetch<MockupRoundup | null>(
    mockupRoundupQuery,
    { slug },
    registryContentFetchOptions
  )
}

export function getAgentConsoleEditorialPage(
  page: AgentConsoleEditorialPageName
) {
  return sanityClient.fetch<AgentConsoleEditorialPage | null>(
    agentConsoleEditorialPageQuery,
    { page },
    registryContentFetchOptions
  )
}
