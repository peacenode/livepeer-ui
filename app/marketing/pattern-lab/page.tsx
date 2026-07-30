import type { Metadata } from "next"

import { BrandPatternLab } from "@/components/marketing/brand-pattern-lab"

export const metadata: Metadata = {
  title: "Brand Pattern Lab",
  description:
    "A 16:9 circle lattice that carves Livepeer figures and patterns as negative space.",
}

export default function PatternLabPage() {
  return (
    <article className="w-full max-w-7xl pb-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Brand Pattern Lab
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          A connected circle lattice that carves figures and full-field
          patterns as negative space.
        </p>
      </header>

      <BrandPatternLab />
    </article>
  )
}
