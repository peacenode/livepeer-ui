import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SocialAvatar } from "@/components/marketing/social-avatar"
import { getSocialAvatar, socialAvatars } from "@/lib/social-assets"

export function generateStaticParams() {
  return socialAvatars.map(({ id }) => ({ id }))
}

export async function generateMetadata({
  params,
}: PageProps<"/social-assets/avatars/[id]">): Promise<Metadata> {
  const { id } = await params
  const avatar = getSocialAvatar(id)

  return {
    title: avatar
      ? `Avatar · ${avatar.width} × ${avatar.height}`
      : "Social avatar",
  }
}

export default async function SocialAvatarPage({
  params,
}: PageProps<"/social-assets/avatars/[id]">) {
  const { id } = await params
  const avatar = getSocialAvatar(id)

  if (!avatar) notFound()

  return <SocialAvatar avatar={avatar} />
}
