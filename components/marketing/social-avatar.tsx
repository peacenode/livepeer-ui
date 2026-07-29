import { LivepeerGradientSymbol } from "@/components/brand"
import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

export function SocialAvatar({ avatar }: { avatar: SocialAvatarConfig }) {
  return (
    <main
      className="relative isolate grid place-items-center overflow-hidden rounded-full bg-black"
      style={{
        width: avatar.width,
        height: avatar.height,
        containerType: "size",
      }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <LivepeerGradientSymbol
        className="h-[52cqh] w-auto translate-x-[13%]"
        aria-hidden="true"
      />
      <style>{"nextjs-portal { display: none !important; }"}</style>
    </main>
  )
}
