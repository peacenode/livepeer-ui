import type { Metadata } from "next"

import { SansTypeScale } from "@/components/docs/sans-type-scale"

export const metadata: Metadata = {
  title: "Font sans",
  description: "Inter is the default face for product UI and ordinary text.",
}

export default function InterPage() {
  return (
    <article className="w-full font-sans">
      <h1 className="text-3xl tracking-tight">Font sans</h1>
      <p className="mt-2 max-w-2xl text-balance text-muted-foreground">
        Inter is the default face for product UI, ordinary headings, and text.
        The complete named Tailwind scale runs from text-xs through text-9xl.
      </p>

      <SansTypeScale />
    </article>
  )
}
