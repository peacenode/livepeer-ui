import { LivepeerGradientSymbol } from "@/components/brand"
import type { SocialAvatar as SocialAvatarConfig } from "@/lib/social-assets"

export function SocialAvatar({ avatar }: { avatar: SocialAvatarConfig }) {
  return (
    <main
      className="relative isolate grid place-items-center overflow-hidden bg-black"
      style={{
        width: avatar.width,
        height: avatar.height,
        containerType: "size",
      }}
      data-avatar-id={avatar.id}
      data-avatar-size={`${avatar.width}x${avatar.height}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color(display-p3 0.015 0.16 0.095) 0%, color(display-p3 0.008 0.055 0.034) 42%, black 76%)",
        }}
      />
      <LivepeerGradientSymbol
        className="relative z-10 h-[44cqh] w-auto"
        aria-hidden="true"
      />
    </main>
  )
}
