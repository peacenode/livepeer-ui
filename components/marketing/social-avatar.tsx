import Image from "next/image"

import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

export function SocialAvatar({ avatar }: { avatar: SocialAvatarConfig }) {
  return (
    <main
      className="overflow-hidden bg-black"
      style={{ width: avatar.width, height: avatar.height }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <Image
        src={avatar.imageUrl!}
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
