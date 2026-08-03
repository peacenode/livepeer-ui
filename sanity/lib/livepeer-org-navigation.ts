import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export type LivepeerOrgNavigationImages = Record<string, string | null>

const query = defineQuery(`{
  "Ecosystem": *[_type == "livepeerOrgPage" && page == "ecosystem"][0].ecosystemContent.apps[image.asset->_createdAt >= $uploadedAfter][0].image.asset->url,
  "Livepeer Token": *[_id == "livepeerBlogPost-q1-2026-messari-state-of-livepeer" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Delegate LPT": *[_id == "livepeerBlogPost-why-delegation-still-matters-in-a-low-inflation-environment" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Provide GPUs": *[_id == "livepeerBlogPost-livepeer-incorporated-and-realtime-ai" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Roadmap": *[_id == "livepeerBlogPost-a-real-time-update-to-the-livepeer-network-vision" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Blog": *[_id == "livepeerBlogPost-builder-spotlight-mike-zupper" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Brand": *[_id == "livepeerBlogPost-introducing-the-livepeer-foundation" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Documentation": *[_id == "livepeerBlogPost-introducing-livepeer-cascade-a-vision-for-livepeers-future-in-the-age-of-real-time-ai-video" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Livepeer Agent": *[_id == "livepeerBlogPost-livepeer-2-0-video-agent-platform" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Agent Playbooks": *[_id == "livepeerBlogPost-ai-x-open-media-forum" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url,
  "Agent Documentation": *[_id == "livepeerBlogPost-builder-spotlight-frameworks" && heroImage.asset->_createdAt >= $uploadedAfter][0].heroImage.asset->url
}`)

export function getLivepeerOrgNavigationImages() {
  return sanityClient.fetch<LivepeerOrgNavigationImages>(
    query,
    { uploadedAfter: "2026-08-03T00:00:00Z" },
    {
      next: { revalidate: 60, tags: ["livepeer-org-content"] },
    }
  )
}
