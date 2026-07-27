import { defineQuery } from "next-sanity"

import type {
  LivepeerOrgPage,
  LivepeerOrgPageSlug,
  LivepeerOrgSite,
} from "@/components/mockups/contracts"
import { sanityClient } from "@/sanity/lib/client"

export type {
  EditorialLink,
  EcosystemEditorialApp,
  LivepeerOrgPage,
  LivepeerOrgPageSlug,
  LivepeerOrgSite,
} from "@/components/mockups/contracts"

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
