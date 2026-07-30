import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SocialBannerArtwork } from "@/components/marketing/social-banner"
import { Badge } from "@/components/ui/badge"
import { XProfilePreview } from "@/components/marketing/x-profile-preview"
import { pressDeliverables, type PressDeliverable } from "@/lib/press-kit"
import {
  getSocialAvatarImagePath,
  getSocialBannerImagePath,
  socialAvatarBatch,
  socialAvatars,
  socialBanners,
} from "@/lib/social-assets"

export const metadata: Metadata = {
  title: "Social Kit · Deliverables",
  description:
    "The brand asset deliverables and export requirements for Livepeer's public channels.",
}

export default function PressKitPage() {
  return (
    <article className="w-full max-w-5xl pb-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Social Kit</h1>
        <p className="mt-2 text-balance text-muted-foreground">
          The brand asset deliverables and export requirements for
          Livepeer&apos;s public channels.
        </p>
      </header>

      <XProfilePreview />

      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {pressDeliverables.map((deliverable) => (
          <Deliverable key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </article>
  )
}

function Deliverable({ deliverable }: { deliverable: PressDeliverable }) {
  const sizes = deliverable.requirements.filter(
    (requirement, index, requirements) =>
      requirements.findIndex(
        ({ width, height }) =>
          width === requirement.width && height === requirement.height
      ) === index
  )
  return (
    <article>
      <DeliverablePreview deliverable={deliverable} />
      <div className="mt-4">
        <h2 className="text-lg font-medium">{deliverable.name}</h2>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map(({ width, height }) => {
            const banner =
              deliverable.id === "banners-headers"
                ? socialBanners.find(
                    (candidate) =>
                      candidate.width === width && candidate.height === height
                  )
                : undefined
            const avatar =
              deliverable.id === "avatar"
                ? socialAvatars.find(
                    (candidate) =>
                      candidate.width === width && candidate.height === height
                  )
                : undefined
            const label = `${width} × ${height} px`

            return avatar ? (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-sm"
                render={
                  <Link
                    href={getSocialAvatarImagePath(avatar)}
                    download={`livepeer-avatar-${avatar.width}x${avatar.height}.png`}
                    aria-label={`Download ${label} avatar`}
                  />
                }
              >
                {label}
              </Badge>
            ) : banner ? (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-sm"
                render={
                  <Link
                    href={getSocialBannerImagePath(banner)}
                    download={`${banner.id}-${banner.width}x${banner.height}.png`}
                    aria-label={`${label} ${banner.platform} banner`}
                  />
                }
              >
                {label}
              </Badge>
            ) : (
              <Badge key={label} variant="secondary" className="rounded-sm">
                {label}
              </Badge>
            )
          })}
        </div>
      </div>

    </article>
  )
}

function DeliverablePreview({
  deliverable,
}: {
  deliverable: PressDeliverable
}) {
  const isAvatar = deliverable.id === "avatar"
  const isBanner = deliverable.id === "banners-headers"

  return (
    <div className="flex aspect-3/1 items-start justify-start">
      <div
        className={`relative h-full overflow-hidden bg-black ${
          isAvatar ? "aspect-square" : "w-full"
        }`}
        style={{
          aspectRatio: `${deliverable.previewWidth} / ${deliverable.previewHeight}`,
          containerType: isBanner ? "size" : undefined,
        }}
        aria-label={`${deliverable.name} aspect ratio`}
        role="img"
      >
        {isAvatar ? (
          <Image
            src={`/social-assets/avatars/${socialAvatarBatch}/800.png`}
            fill
            sizes="320px"
            alt="Livepeer avatar"
            className="object-cover"
            unoptimized
          />
        ) : null}
        {isBanner ? <SocialBannerArtwork bottomAligned /> : null}
      </div>
    </div>
  )
}
