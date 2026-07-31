import type { Metadata } from "next"

import { SlideLayouts } from "@/components/docs/slide-layouts"

export const metadata: Metadata = {
  title: "Slides",
  description:
    "Livepeer slide layouts in 16:9 and 9:16 with left, center, and right hero alignment.",
}

export default function SlidesPage() {
  return (
    <article className="max-w-6xl">
      <h1 className="text-3xl font-semibold tracking-tight">Slides</h1>
      <p className="mt-2 max-w-3xl text-balance text-muted-foreground">
        Livepeer slide layouts for landscape and portrait formats. Each
        composition includes the brand lockup, top and bottom text rails, and
        left, center, or right hero alignment.
      </p>

      <SlideLayouts />
    </article>
  )
}
