import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SocialBanner } from "@/components/marketing/social-banner"
import { getSocialBanner, socialBanners } from "@/lib/social-assets"

export function generateStaticParams() {
  return socialBanners.map(({ id }) => ({ id }))
}

export async function generateMetadata({
  params,
}: PageProps<"/social-assets/banners/[id]">): Promise<Metadata> {
  const { id } = await params
  const banner = getSocialBanner(id)

  return {
    title: banner
      ? `${banner.platform} banner · ${banner.width} × ${banner.height}`
      : "Social banner",
  }
}

export default async function SocialBannerPage({
  params,
}: PageProps<"/social-assets/banners/[id]">) {
  const { id } = await params
  const banner = getSocialBanner(id)

  if (!banner) notFound()

  return <SocialBanner banner={banner} />
}
