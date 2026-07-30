import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { SocialBannerArtwork } from "@/components/marketing/social-banner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XProfilePreview } from "@/components/marketing/x-profile-preview"
import { pressDeliverables, type PressDeliverable } from "@/lib/press-kit"
import {
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

      <section className="mt-12 border-y py-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Brand Pattern Lab
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Develop separate 16:9 subtractive pattern studies without changing
              the linked social banners.
            </p>
          </div>
          <Button
            variant="outline"
            render={<Link href="/marketing/pattern-lab" />}
          >
            Open pattern lab
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </div>
      </section>

      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {pressDeliverables.map((deliverable) => (
          <Deliverable key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>

      <section className="mt-16 border-t pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Banner routes</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each route renders the shared banner composition at its exact export
          dimensions.
        </p>
        <div className="mt-5 divide-y border-y">
          {socialBanners.map((banner) => (
            <Link
              key={banner.id}
              href={`/social-assets/banners/${banner.id}`}
              className="flex items-center justify-between gap-4 py-3 text-sm hover:text-foreground/65"
            >
              <span>{banner.platform}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                {banner.width} × {banner.height}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
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
  const platforms = deliverable.requirements.flatMap(({ platform }) =>
    platform.split(/\s*[/,]\s*/)
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
                    href={`/social-assets/avatars/${avatar.id}`}
                    aria-label={`${label} avatar for ${avatar.platforms}`}
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
                    href={`/social-assets/banners/${banner.id}`}
                    aria-label={`${label} ${banner.platform} banner`}
                  />
                }
              >
                {label}
              </Badge>
            ) : (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-sm"
              >
                {label}
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="mt-2">
        <div className="flex flex-wrap gap-1.5">
          {[...new Set(platforms)].map((platform) => (
            <Badge key={platform} className="rounded-sm">
              {platform}
            </Badge>
          ))}
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
  const ratio = deliverable.previewWidth / deliverable.previewHeight
  const isAvatar = deliverable.id === "avatar"
  const isBanner = deliverable.id === "banners-headers"
  const isSocialPreview = deliverable.id === "social-preview"
  const hasBannerArtwork = isBanner || isSocialPreview

  return (
    <div className="flex aspect-4/3 items-center justify-center rounded-sm bg-muted p-8">
      <div
        className={`relative max-h-full max-w-full overflow-hidden ${
          isAvatar || hasBannerArtwork
            ? "bg-black"
            : "bg-muted-foreground/20"
        }`}
        style={{
          aspectRatio: `${deliverable.previewWidth} / ${deliverable.previewHeight}`,
          containerType: hasBannerArtwork ? "size" : undefined,
          width:
            ratio >= 2.5
              ? "100%"
              : ratio >= 1.1
                ? "90%"
                : ratio >= 1
                  ? "60%"
                  : "auto",
          height: ratio < 1 ? "100%" : "auto",
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
        {isSocialPreview ? <SocialBannerArtwork /> : null}
      </div>
    </div>
  )
}
