import type { Metadata } from "next"

import { BrandPatternLab } from "@/components/marketing/brand-pattern-lab"

export const metadata: Metadata = {
  title: "Brand Pattern Lab",
  description:
    "A 16:9 Three.js canvas for developing dimensional Livepeer brand patterns.",
}

export default function PatternLabPage() {
  return (
    <article className="w-full max-w-7xl pb-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Brand Pattern Lab
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          Subtract a repeating Livepeer SVG pattern from a dimensional surface,
          then shape the field and sweep light across its cut edges.
        </p>
      </header>

      <BrandPatternLab />
    </article>
  )
}
