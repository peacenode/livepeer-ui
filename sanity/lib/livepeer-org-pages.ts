import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type EditorialLink = { _key?: string; label: string; href: string }
export type LivepeerOrgPageSlug =
  | "home"
  | "livepeer-agent"
  | "playbook-library"
  | "ecosystem"
  | "provide-gpu-compute"

export interface LivepeerOrgSite {
  _id: "livepeerOrgSite"
  homeHref: string
  menuLinks: EditorialLink[]
  footerTagline: string
  footerGroups: { _key: string; title: string; links: EditorialLink[] }[]
  socialLinks: (EditorialLink & {
    service: "discord" | "x" | "github" | "website"
  })[]
  copyright: string
}

export interface EcosystemEditorialApp {
  _key: string
  name: string
  domain: string
  href: string
  description: string
  image: string
  tags: string[]
}

export interface LivepeerOrgPage {
  _id: string
  page: LivepeerOrgPageSlug
  seoTitle: string
  seoDescription?: string
  homeContent?: {
    hero: {
      heading: string
      accent: string
      primaryCta: EditorialLink
      secondaryCta: EditorialLink
    }
    agentFeature: {
      description: string
      installCta: EditorialLink
      libraryCta: EditorialLink
    }
    providerCta: { heading: string; description: string; cta: EditorialLink }
  }
  agentContent?: {
    hero: {
      heading: string
      description: string
      serverUrl: string
      signInCta: EditorialLink
      createAccountCta: EditorialLink
    }
    access: { heading: string; description: string; cta: EditorialLink }
    capabilities: { heading: string; cta: EditorialLink }
    playbooks: { heading: string; description: string; cta: EditorialLink }
  }
  libraryContent?: {
    heading: string
    description: string
    searchPlaceholder: string
    allCategoryLabel: string
    emptyMessage: string
    footerHeading: string
  }
  ecosystemContent?: {
    heading: string
    description: string
    submitLabel: string
    searchPlaceholder: string
    emptyMessage: string
    apps: EcosystemEditorialApp[]
    submission: {
      heading: string
      description: string
      steps: { _key: string; heading: string; description: string }[]
      templatePath: string
      template: string
      closeLabel: string
      githubCta: EditorialLink
    }
  }
  earnContent?: {
    earnings: {
      servicePayoutsLabel: string
      protocolRewardsLabel: string
      periodLabel: string
    }
    hero: { heading: string; description: string; cta: EditorialLink }
    pathsHeading: string
    pathsDescription: string
    paths: {
      _key: string
      heading: string
      fit: string
      description: string
      icon: "cable" | "sparkles" | "server-cog"
      requirements: string[]
      note: string
      cta: EditorialLink
    }[]
    baselineHeading: string
    baselineDescription: string
    baseline: {
      _key: string
      heading: string
      description: string
      icon: "cpu" | "server" | "network" | "dollar"
    }[]
    arbitrum: {
      heading: string
      description: string
      imageAlt: string
      disclaimer: string
      cta: EditorialLink
    }
    stake: { heading: string; description: string; cta: EditorialLink }
  }
}

const siteQuery = defineQuery(
  `*[_type == "livepeerOrgSite" && _id == "livepeerOrgSite"][0]`
)
const pageQuery = defineQuery(`*[_type == "livepeerOrgPage" && _id == $id][0]`)
const options = { next: { revalidate: 60, tags: ["livepeer-org-content"] } }

export async function getLivepeerOrgSite(): Promise<LivepeerOrgSite> {
  const site = await sanityClient.fetch<LivepeerOrgSite | null>(
    siteQuery,
    {},
    options
  )
  if (!site)
    throw new Error('Required Sanity document "livepeerOrgSite" is missing.')
  return site
}

export async function getLivepeerOrgPage<T extends LivepeerOrgPageSlug>(
  slug: T
): Promise<LivepeerOrgPage & { page: T }> {
  const id = `livepeerOrgPage-${slug}`
  const page = await sanityClient.fetch<LivepeerOrgPage | null>(
    pageQuery,
    { id },
    options
  )
  if (!page) throw new Error(`Required Sanity document "${id}" is missing.`)
  if (page.page !== slug)
    throw new Error(
      `Sanity document "${id}" has page "${page.page}", expected "${slug}".`
    )
  return page as LivepeerOrgPage & { page: T }
}
