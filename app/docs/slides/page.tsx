import type { Metadata } from "next"

import { SlideLayouts } from "@/components/docs/slide-layouts"

export const metadata: Metadata = {
  title: "Slides",
  description:
    "Fixed-size Livepeer slide canvases in 1920 × 1080 and 1080 × 1920 formats.",
}

export default function SlidesPage() {
  return (
    <article className="max-w-6xl">
      <h1 className="text-3xl font-semibold tracking-tight">Slides</h1>
      <p className="mt-2 max-w-3xl text-balance text-muted-foreground">
        Fixed 1920 × 1080 and 1080 × 1920 canvases, uniformly scaled for
        preview. Every element keeps its original canvas size and position.
      </p>

      <SlideLayouts />
    </article>
  )
}
