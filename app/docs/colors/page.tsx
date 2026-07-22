import type { Metadata } from "next"

import { ColorScale } from "@/components/docs/color-scale"

export const metadata: Metadata = {
  title: "Colors",
  description:
    "The brand palette — neutral for the interface, emerald and sky as accents, mapped to Tailwind scales.",
}

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

const SCALES = [
  {
    name: "Neutral",
    swatches: [
      "bg-neutral-50",
      "bg-neutral-100",
      "bg-neutral-200",
      "bg-neutral-300",
      "bg-neutral-400",
      "bg-neutral-500",
      "bg-neutral-600",
      "bg-neutral-700",
      "bg-neutral-800",
      "bg-neutral-900",
      "bg-neutral-950",
    ],
  },
  {
    name: "Emerald",
    swatches: [
      "bg-emerald-50",
      "bg-emerald-100",
      "bg-emerald-200",
      "bg-emerald-300",
      "bg-emerald-400",
      "bg-emerald-500",
      "bg-emerald-600",
      "bg-emerald-700",
      "bg-emerald-800",
      "bg-emerald-900",
      "bg-emerald-950",
    ],
  },
  {
    name: "Sky",
    swatches: [
      "bg-sky-50",
      "bg-sky-100",
      "bg-sky-200",
      "bg-sky-300",
      "bg-sky-400",
      "bg-sky-500",
      "bg-sky-600",
      "bg-sky-700",
      "bg-sky-800",
      "bg-sky-900",
      "bg-sky-950",
    ],
  },
]

export default function ColorsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Colors</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        The palette stays on default Tailwind scales. Neutral carries the
        interface — it is the base color of the theme. Emerald and sky are the
        accents, chosen as the closest Tailwind scales to the greens and blues
        of the Livepeer brand. Click a swatch to copy its hex value.
      </p>
      {SCALES.map((scale) => (
        <ColorScale
          key={scale.name}
          name={scale.name}
          swatches={scale.swatches.map((className, index) => ({
            step: STEPS[index],
            className,
          }))}
        />
      ))}
    </article>
  )
}
