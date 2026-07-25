"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const laneCount = 6
const desktopParticleCount = 360
const mobileParticleCount = 150
const colors = ["#24282a", "#626a6d", "#aeb5b2", "#d7dbd7", "#00a86b"]

type Particle = {
  color: string
  drift: number
  lane: number
  opacity: number
  phase: number
  size: number
  speed: number
}

function noise(seed: number) {
  return Math.sin(seed * 91.733) * 0.5 + 0.5
}

function makeParticles(count: number): Particle[] {
  const particlesPerLane = count / laneCount

  return Array.from({ length: count }, (_, index) => {
    const lane = index % laneCount
    const slot = Math.floor(index / laneCount)

    return {
      color: colors[Math.floor(noise(index + 41) * colors.length)],
      drift: noise(index + 19) - 0.5,
      lane,
      opacity: 0.46 + noise(index + 7) * 0.48,
      phase:
        (slot / particlesPerLane +
          lane / count +
          (noise(index + 3) - 0.5) * 0.012 +
          1) %
        1,
      size: 2.5 + noise(index + 13) * 5,
      speed: 0.84 + noise(index + 29) * 0.3,
    }
  })
}

function LivepeerCubeStream({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const pointer = { x: 0, y: 0 }
    let frame = 0
    let height = 0
    let width = 0
    let particles: Particle[] = []
    let start = performance.now()

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = makeParticles(
        width < 640 ? mobileParticleCount : desktopParticleCount
      )
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)

      const elapsed = reduceMotion ? 2.8 : (time - start) / 1000

      for (const particle of particles) {
        const travel = reduceMotion ? 0 : elapsed * 0.028 * particle.speed
        const progress = (particle.phase + travel) % 1
        const arch = progress * progress
        const lanePosition =
          (particle.lane - (laneCount - 1) / 2) / ((laneCount - 1) / 2)

        // This is the source drawing's silhouette: a compact entry at the
        // upper center that progressively opens into the lower-right.
        const centerX = 0.59 + progress * 0.025 + arch * 0.285
        const bandWidth = 0.018 + progress * 0.035 + arch * 0.018
        const scatter = particle.drift * (5 + progress * 13)
        const x =
          (centerX + lanePosition * bandWidth) * width +
          scatter +
          pointer.x * 8
        const y =
          (-0.08 + progress * 1.18) * height +
          particle.drift * 12 +
          pointer.y * 5
        const perspective = 0.48 + progress * 0.9
        const size = particle.size * perspective

        context.globalAlpha =
          particle.opacity * (0.65 + progress * 0.35)
        context.fillStyle = particle.color
        context.fillRect(
          Math.round(x - size / 2),
          Math.round(y - size / 2),
          Math.max(2, Math.round(size)),
          Math.max(2, Math.round(size))
        )
      }

      context.globalAlpha = 1
      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5
      pointer.y = event.clientY / window.innerHeight - 0.5
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener("pointermove", handlePointer, { passive: true })
    resize()
    start = performance.now()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("pointermove", handlePointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        className
      )}
      aria-hidden="true"
    />
  )
}

export { LivepeerCubeStream }
