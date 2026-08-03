import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type LivepeerOrgNavigationImages = Record<string, string | null>

const query = defineQuery(`{
  "Ecosystem": *[_type == "livepeerOrgPage" && page == "ecosystem"][0].ecosystemContent.apps[0].image.asset->url,
  "Livepeer Token": *[_type == "livepeerOrgPage" && page == "token"][0].tokenContent.hero.illustration.asset->url,
  "Delegate LPT": *[_type == "livepeerOrgPage" && page == "token"][0].tokenContent.role.illustration.asset->url,
  "Provide GPUs": *[_type == "livepeerOrgPage" && page == "provide-gpu-compute"][0].earnContent.hero.illustration.asset->url,
  "Roadmap": *[_type == "livepeerOrgPage" && page == "foundation"][0].foundationContent.project.illustration.asset->url,
  "Blog": (*[_type == "livepeerBlogPost"] | order(publishedAt desc))[0].heroImage.asset->url,
  "Brand": *[_type == "livepeerOrgPage" && page == "foundation"][0].foundationContent.about.illustration.asset->url,
  "Documentation": *[_type == "agentRolloutFlow"][0].phases[0].userFlow[0].image.asset->url,
  "Livepeer Agent": *[_type == "agentRolloutFlow"][0].phases[0].marketingPages[0].image.asset->url,
  "Agent Playbooks": *[_type == "agentRolloutFlow"][0].phases[0].userFlow[0].image.asset->url,
  "Agent Documentation": *[_type == "agentRolloutFlow"][0].phases[0].userFlow[1].image.asset->url
}`)

export function getLivepeerOrgNavigationImages() {
  return sanityClient.fetch<LivepeerOrgNavigationImages>(
    query,
    {},
    {
      next: { revalidate: 60, tags: ["livepeer-org-content"] },
    }
  )
}
