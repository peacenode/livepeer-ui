import Image from "next/image"

import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

const avatarBatch = "20260729-131235"

export function SocialAvatar({ avatar }: { avatar: SocialAvatarConfig }) {
  return (
    <main
      className="overflow-hidden bg-black"
      style={{ width: avatar.width, height: avatar.height }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <Image
        src={`/social-assets/avatars/${avatarBatch}/${avatar.id}.png`}
        width={avatar.width}
        height={avatar.height}
        alt="Livepeer"
        priority
        unoptimized
      />
      <style>{"nextjs-portal { display: none !important; }"}</style>
    </main>
  )
}
