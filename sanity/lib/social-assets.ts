import { defineQuery } from "next-sanity"

import type { SocialAvatar, SocialBanner } from "@/lib/social-assets"
import { sanityClient } from "@/sanity/lib/client"

export interface SocialPreview {
  id: string
  width: number
  height: number
  imageUrl: string
}

export interface SocialAssetSet {
  wordmarkUrl: string
  avatars: (SocialAvatar & { imageUrl: string })[]
  banners: (SocialBanner & { imageUrl: string })[]
  previews: SocialPreview[]
}

const query =
  defineQuery(`*[_type == "socialAssetSet" && _id == "socialAssetSet-current"][0]{
  "wordmarkUrl": wordmark.asset->url,
  "avatars": avatars[]{id, platforms, width, height, "imageUrl": image.asset->url},
  "banners": banners[]{id, platform, width, height, "imageUrl": image.asset->url},
  "previews": previews[]{id, width, height, "imageUrl": image.asset->url}
}`)

export async function getSocialAssetSet() {
  const assets = await sanityClient
    .withConfig({ useCdn: false })
    .fetch<SocialAssetSet | null>(query, {}, { cache: "no-store" })
  if (!assets)
    throw new Error(
      'Required Sanity document "socialAssetSet-current" is missing.'
    )
  return assets
}
