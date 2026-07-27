import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { pressDeliverables, type PressDeliverable } from "@/lib/press-kit"

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

      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {pressDeliverables.map((deliverable) => (
          <Deliverable key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </article>
  )
}

function Deliverable({ deliverable }: { deliverable: PressDeliverable }) {
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
      <div className="mt-4">
        <h2 className="text-lg font-medium">{deliverable.name}</h2>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <Badge key={size} variant="secondary" className="rounded-sm">
              {size}
            </Badge>
          ))}
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

  return (
    <div className="flex aspect-4/3 items-center justify-center rounded-sm bg-muted p-8">
      <div
        className="max-h-full max-w-full bg-muted-foreground/20"
        style={{
          aspectRatio: `${deliverable.previewWidth} / ${deliverable.previewHeight}`,
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
      />
    </div>
  )
}
