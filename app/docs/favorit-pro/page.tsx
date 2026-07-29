import type { Metadata } from "next"

import { DisplayTypeScale } from "@/components/docs/display-type-scale"

export const metadata: Metadata = {
  title: "Font display",
  description: "Favorit Pro is reserved for marketing display copy.",
}

export default function FavoritProPage() {
  return (
    <article className="w-full font-sans">
      <h1 className="text-3xl tracking-tight">Font display</h1>
      <p className="mt-2 max-w-2xl text-balance text-muted-foreground">
        Favorit Pro is reserved for marketing display copy and must be selected
        explicitly with <code className="font-sans">font-display</code>. The
        complete named Tailwind scale runs from text-xs through text-9xl.
      </p>

      <DisplayTypeScale />
    </article>
  )
}
