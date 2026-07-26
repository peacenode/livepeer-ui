import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import {
  pressDeliverables,
  type PressDeliverable,
} from "@/lib/press-kit"

export const metadata: Metadata = {
  title: "Press Kit · Deliverables",
  description:
    "The brand asset deliverables and export requirements for Livepeer's public channels.",
}

export default function PressKitPage() {
  return (
    <div className="mx-auto w-full max-w-5xl pb-20">
      <header className="pb-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Press kit / Deliverables
        </p>
        <h1 className="max-w-4xl text-pretty text-4xl font-medium tracking-tight sm:text-5xl">
          Brand asset deliverables
        </h1>
      </header>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {pressDeliverables.map((deliverable) => (
          <Deliverable key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </div>
  )
}

function Deliverable({
  deliverable,
}: {
  deliverable: PressDeliverable
}) {
  const sizes = [
    ...new Set(
      deliverable.requirements.map(
        ({ width, height }) => `${width} × ${height} px`
      )
    ),
  ]
  const platforms = deliverable.requirements.flatMap(({ platform }) =>
    platform.split(/\s*[/,]\s*/)
  )

  return (
    <article>
      <DeliverablePreview deliverable={deliverable} />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium">{deliverable.name}</h2>
        <span className="text-xs text-muted-foreground">
          {deliverable.format}
        </span>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <Badge key={size} variant="secondary" className="rounded-sm">
              {size}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Used on
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[...new Set(platforms)].map((platform) => (
            <Badge key={platform} variant="outline" className="rounded-sm">
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

  return (
    <div className="flex aspect-4/3 items-center justify-center rounded-sm bg-muted p-8">
      <div
        className="max-h-full max-w-full bg-muted-foreground/20"
        style={{
          aspectRatio: `${deliverable.previewWidth} / ${deliverable.previewHeight}`,
          width:
            ratio >= 2.5 ? "100%" : ratio >= 1.1 ? "90%" : ratio >= 1 ? "60%" : "auto",
          height: ratio < 1 ? "100%" : "auto",
        }}
        aria-label={`${deliverable.name} aspect ratio`}
        role="img"
      />
    </div>
  )
}
