"use client"

import { useEffect, useRef } from "react"

import { DotCut } from "@/lib/dotcut/engine"

export function BrandPatternLab() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const engine = new DotCut(host, "Inter, sans-serif")
    if (!engine.ok) {
      engine.destroy()
      return
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    let isVisible = true

    const syncPlayback = () => {
      const shouldRun =
        isVisible && !document.hidden && !reducedMotion.matches

      if (shouldRun) engine.start()
      else {
        engine.stop()
        engine.renderStill()
      }
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        syncPlayback()
      },
      { threshold: 0.05 }
    )

    const setPointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      engine.setPointer(
        engine.toCell(event.clientX - bounds.left, event.clientY - bounds.top)
      )
    }
    const clearPointer = () => engine.setPointer(null)

    visibilityObserver.observe(host)
    document.addEventListener("visibilitychange", syncPlayback)
    reducedMotion.addEventListener("change", syncPlayback)
    host.addEventListener("pointermove", setPointer)
    host.addEventListener("pointerleave", clearPointer)
    host.addEventListener("pointercancel", clearPointer)
    syncPlayback()

    return () => {
      visibilityObserver.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      reducedMotion.removeEventListener("change", syncPlayback)
      host.removeEventListener("pointermove", setPointer)
      host.removeEventListener("pointerleave", clearPointer)
      host.removeEventListener("pointercancel", clearPointer)
      engine.destroy()
    }
  }, [])

  return (
    <section className="mt-8">
      <div
        ref={hostRef}
        className="relative aspect-video overflow-hidden rounded-sm border bg-black"
        data-pattern-canvas
        role="img"
        aria-label="Animated field of touching circles forming negative-space patterns"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 text-[10px] font-medium tracking-widest text-white/55 uppercase mix-blend-difference">
          <span>Livepeer dot cut study</span>
          <span>42 × adaptive</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Move across the field to retract the connected mesh.
      </p>
    </section>
  )
}
