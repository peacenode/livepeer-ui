"use client"

import { useEffect, useRef } from "react"

import { DotCut } from "@/lib/dotcut/engine"

const variations = [
  { name: "Hero mark", detail: "Single large cut" },
  { name: "Tight repeat", detail: "Aligned field" },
  { name: "Stagger", detail: "Offset field" },
  { name: "Stream", detail: "Diagonal sequence" },
  { name: "Radial", detail: "Rotating ring" },
  { name: "Weave", detail: "Interlocking field" },
] as const

export function BrandPatternLab() {
  return (
    <section className="mt-8">
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        {variations.map((variation, index) => (
          <PatternVariation
            key={variation.name}
            detail={variation.detail}
            index={index}
            name={variation.name}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Move across any field to retract its connected mesh.
      </p>
    </section>
  )
}

function PatternVariation({
  detail,
  index,
  name,
}: {
  detail: string
  index: number
  name: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const engine = new DotCut(host, index)
    if (!engine.ok) {
      engine.destroy()
      return
    }

    const setPointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      engine.setPointer(
        engine.toCell(
          event.clientX - bounds.left,
          event.clientY - bounds.top
        )
      )
    }
    const clearPointer = () => engine.setPointer(null)

    engine.renderStill()
    host.addEventListener("pointermove", setPointer)
    host.addEventListener("pointerleave", clearPointer)
    host.addEventListener("pointercancel", clearPointer)

    return () => {
      host.removeEventListener("pointermove", setPointer)
      host.removeEventListener("pointerleave", clearPointer)
      host.removeEventListener("pointercancel", clearPointer)
      engine.destroy()
    }
  }, [index])

  return (
    <figure>
      <div
        ref={hostRef}
        className="relative aspect-video overflow-hidden rounded-sm border bg-black"
        data-pattern-canvas
        role="img"
        aria-label={`${name}: Livepeer symbol carved from a touching circle lattice`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 text-[10px] font-medium tracking-widest text-white/55 uppercase mix-blend-difference">
          <span>{name}</span>
          <span>42 × adaptive</span>
        </div>
      </div>
      <figcaption className="mt-2 flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{detail}</span>
      </figcaption>
    </figure>
  )
}
