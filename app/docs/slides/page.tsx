import type { Metadata } from "next"

import { SlideComposer } from "@/components/docs/slide-composer"

export const metadata: Metadata = {
  title: "Slides",
  description:
    "A reusable 16:9 slide foundation with seven text positions and flexible hero alignment.",
}

export default function SlidesPage() {
  return (
    <article className="max-w-6xl">
      <h1 className="text-3xl font-semibold tracking-tight">Slides</h1>
      <p className="mt-2 max-w-3xl text-balance text-muted-foreground">
        A basic 16:9 composition with six metadata positions and a primary
        statement. Edit the seven text fields and set the hero left, center, or
        right.
      </p>

      <SlideComposer />
    </article>
  )
}
