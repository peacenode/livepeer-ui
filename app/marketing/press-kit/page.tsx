import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { pressAssets, destinationCount, type PressAsset } from "@/lib/press-kit"

export const metadata: Metadata = {
  title: "Press Kit · Asset Inventory",
  description:
    "The unique image sizes required across Livepeer's public channels.",
}

export default function PressKitPage() {
  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      <header className="border-b pb-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Press kit / Asset inventory
        </p>
        <h1 className="max-w-4xl text-pretty text-4xl font-medium tracking-tight sm:text-5xl">
          Every canvas Livepeer needs to produce
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Unique export sizes, shown at their native aspect ratios and tagged
          with every place they appear.
        </p>
      </header>

      <section className="grid border-b sm:grid-cols-3">
        <Metric label="Unique export sizes" value={pressAssets.length} />
        <Metric label="Destination surfaces" value={destinationCount} />
        <Metric
          label="Reusable square masters"
          value={pressAssets.filter((asset) => asset.width === asset.height).length}
        />
      </section>

      <section className="py-10">
        <div className="mb-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Production inventory
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              The preview area preserves each file’s actual proportions. Visual
              size is normalized only enough to keep extremely wide and tall
              formats readable on this page.
            </p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Specifications checked July 26, 2026
          </p>
        </div>

        <div className="divide-y border-y">
          {pressAssets.map((asset, index) => (
            <AssetRow key={asset.id} asset={asset} index={index + 1} />
          ))}
        </div>
      </section>

      <footer className="border-t pt-6 text-xs leading-5 text-muted-foreground">
        “Production standard” marks a consolidated working size where the
        platform does not publish a strict recommendation. Recheck platform
        specifications before each major brand export.
      </footer>
    </div>
  )
}

function AssetRow({ asset, index }: { asset: PressAsset; index: number }) {
  const ratio = asset.width / asset.height
  const ratioLabel = getRatioLabel(asset.width, asset.height)

  return (
    <article className="grid gap-6 py-8 lg:grid-cols-[2.5rem_minmax(15rem,0.8fr)_minmax(0,1.2fr)] lg:gap-8">
      <span className="text-xs tabular-nums text-muted-foreground">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium">{asset.name}</h3>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {asset.width} × {asset.height} px · {ratioLabel}
            </p>
          </div>
          <Badge variant="outline">{asset.format}</Badge>
        </div>

        <NativeRatioPreview asset={asset} ratio={ratio} />
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Goes to
        </p>
        <div className="flex flex-wrap gap-2">
          {asset.destinations.map((destination) => (
            <Badge
              key={`${destination.surface}-${destination.placement}`}
              variant="secondary"
              className="h-auto max-w-full py-1 whitespace-normal"
            >
              <span className="font-medium">{destination.surface}</span>
              <span className="text-muted-foreground">
                · {destination.placement}
              </span>
            </Badge>
          ))}
        </div>

        {asset.safeArea ? (
          <p className="mt-5 border-l-2 pl-3 text-sm leading-6">
            {asset.safeArea}
          </p>
        ) : null}
        {asset.guidance ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {asset.guidance}
          </p>
        ) : null}

        <a
          href={asset.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {asset.source}
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </article>
  )
}

function NativeRatioPreview({
  asset,
  ratio,
}: {
  asset: PressAsset
  ratio: number
}) {
  const maxWidth =
    ratio >= 6 ? "100%" : ratio >= 2.5 ? "92%" : ratio < 0.8 ? "42%" : "72%"

  return (
    <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-md bg-muted p-5 sm:min-h-56">
      <div
        className="relative grid place-items-center border border-foreground/30 bg-background"
        style={{
          aspectRatio: `${asset.width} / ${asset.height}`,
          maxWidth,
          width: ratio > 1 ? "100%" : "auto",
          height: ratio <= 1 ? "13rem" : "auto",
        }}
      >
        {asset.safeArea?.includes("1235") ? (
          <div
            className="absolute border border-dashed border-foreground/40"
            style={{
              width: `${(1235 / asset.width) * 100}%`,
              height: `${(338 / asset.height) * 100}%`,
            }}
          />
        ) : null}
        {asset.safeArea?.includes("top 48") ? (
          <div
            className="absolute inset-x-0 top-0 border-b border-dashed border-foreground/40 bg-muted/60"
            style={{ height: `${(48 / asset.height) * 100}%` }}
          />
        ) : null}
        <span className="relative bg-background/80 px-2 py-1 font-mono text-[10px] tabular-nums sm:text-xs">
          {asset.width} × {asset.height}
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

function getRatioLabel(width: number, height: number) {
  const divisor = greatestCommonDivisor(width, height)
  return `${width / divisor}:${height / divisor}`
}

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b)
}
