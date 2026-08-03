import Image from "next/image"

import { SocialBannerArtwork } from "@/components/marketing/social-banner"

export function XProfilePreview({
  avatarUrl,
  wordmarkUrl,
}: {
  avatarUrl: string
  wordmarkUrl: string
}) {
  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="text-xl font-semibold tracking-tight">X demo</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        The 1500 × 500 header and 400 × 400 avatar shown at X&apos;s desktop and
        mobile overlap.
      </p>

      <div className="mt-5 grid items-start gap-8 md:grid-cols-[minmax(0,598px)_minmax(240px,390px)]">
        <ProfileFrame
          label="Desktop"
          avatarLeft="2.675%"
          avatarSize="18.73%"
          avatarUrl={avatarUrl}
          wordmarkUrl={wordmarkUrl}
        />
        <ProfileFrame
          label="Mobile"
          avatarLeft="4.1%"
          avatarSize="20.5%"
          avatarUrl={avatarUrl}
          wordmarkUrl={wordmarkUrl}
        />
      </div>
    </section>
  )
}

function ProfileFrame({
  avatarSize,
  avatarLeft,
  label,
  avatarUrl,
  wordmarkUrl,
}: {
  avatarLeft: string
  avatarSize: string
  label: string
  avatarUrl: string
  wordmarkUrl: string
}) {
  return (
    <figure>
      <figcaption className="mb-2 text-xs font-medium text-muted-foreground">
        {label}
      </figcaption>
      <div className="overflow-hidden rounded-xl border bg-background">
        <div
          className="relative aspect-3/1 bg-black"
          style={{ containerType: "size" }}
        >
          <SocialBannerArtwork bottomAligned wordmarkUrl={wordmarkUrl} />
          <div
            className="absolute top-full z-20 -translate-y-1/2 overflow-hidden rounded-full border-4 border-background bg-black"
            style={{
              left: avatarLeft,
              width: avatarSize,
              aspectRatio: "1",
            }}
          >
            <Image
              src={avatarUrl}
              fill
              sizes="112px"
              alt="Livepeer profile avatar"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="h-24 bg-background sm:h-28" aria-hidden="true" />
      </div>
    </figure>
  )
}
