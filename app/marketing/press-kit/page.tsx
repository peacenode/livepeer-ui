import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import {
  destinationCount,
  pressDeliverables,
  requiredExportCount,
  type PressDeliverable,
} from "@/lib/press-kit"

export const metadata: Metadata = {
  title: "Press Kit · Deliverables",
  description:
    "The brand asset deliverables and export requirements for Livepeer's public channels.",
}

export default function PressKitPage() {
  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      <header className="border-b pb-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Press kit / Deliverables
        </p>
        <h1 className="max-w-4xl text-pretty text-4xl font-medium tracking-tight sm:text-5xl">
          Brand asset deliverables
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          The master assets to design, with every required export size grouped
          beneath its deliverable.
        </p>
      </header>

      <section className="grid border-b sm:grid-cols-3">
        <Metric label="Deliverables" value={pressDeliverables.length} />
        <Metric label="Required exports" value={requiredExportCount} />
        <Metric label="Destination groups" value={destinationCount} />
      </section>

      <section className="py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-medium tracking-tight">
            Deliverables sheet
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Design each master once, then use the listed requirements to prepare
            platform-ready exports.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Specifications checked July 26, 2026
          </p>
        </div>

        <div className="divide-y border-y">
          {pressDeliverables.map((deliverable, index) => (
            <DeliverableRow
              key={deliverable.id}
              deliverable={deliverable}
              index={index + 1}
            />
          ))}
        </div>
      </section>

      <footer className="border-t pt-6 text-xs leading-5 text-muted-foreground">
        Recheck platform specifications before each major brand export.
      </footer>
    </div>
  )
}

function DeliverableRow({
  deliverable,
  index,
}: {
  deliverable: PressDeliverable
  index: number
}) {
  return (
    <article className="grid gap-6 py-8 lg:grid-cols-[2.5rem_minmax(15rem,0.8fr)_minmax(0,1.2fr)] lg:gap-8">
      <span className="text-xs tabular-nums text-muted-foreground">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium">{deliverable.name}</h3>
          <Badge variant="outline">{deliverable.format}</Badge>
        </div>
        <DeliverablePreview deliverable={deliverable} />
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {deliverable.guidance}
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Size requirements
        </p>
        <div className="divide-y border-y">
          {deliverable.requirements.map((requirement) => (
            <div
              key={`${requirement.platform}-${requirement.width}-${requirement.height}`}
              className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
            >
              <div>
                <p className="text-sm font-medium">{requirement.platform}</p>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {requirement.placement}
                </p>
                {requirement.note ? (
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {requirement.note}
                  </p>
                ) : null}
              </div>
              <p className="font-mono text-sm whitespace-nowrap tabular-nums sm:text-right">
                {requirement.width} × {requirement.height} px
              </p>
            </div>
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
  const maxWidth = ratio >= 2.5 ? "92%" : ratio < 0.8 ? "42%" : "72%"

  return (
    <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-md bg-muted p-5 sm:min-h-56">
      <div
        className="grid place-items-center border border-foreground/30 bg-background"
        style={{
          aspectRatio: `${deliverable.previewWidth} / ${deliverable.previewHeight}`,
          maxWidth,
          width: ratio > 1 ? "100%" : "auto",
          height: ratio <= 1 ? "13rem" : "auto",
        }}
      >
        <span className="bg-background/80 px-2 py-1 text-center text-xs text-muted-foreground">
          {deliverable.name} master
        </span>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="py-6 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
      <div className="text-3xl font-medium tabular-nums">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
