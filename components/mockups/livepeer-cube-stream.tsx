"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const desktopParticleCount = 1800
const mobileParticleCount = 650
const colors = ["#15191a", "#596164", "#9ca5a2", "#cbd2ce", "#00a86b"]

type Particle = {
  color: string
  offset: number
  opacity: number
  phase: number
  size: number
  speed: number
  wave: number
}

function noise(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const offsetNoise = noise(index + 19) * 2 - 1
    const offset =
      Math.sign(offsetNoise) *
      Math.pow(Math.abs(offsetNoise), 1.75) *
      (0.08 + noise(index + 53) * 0.92)

    return {
      color: colors[Math.floor(noise(index + 41) * colors.length)],
      offset,
      opacity: 0.18 + noise(index + 7) * 0.7,
      phase: (index / count + (noise(index + 3) - 0.5) * 0.008 + 1) % 1,
      size: 1 + Math.pow(noise(index + 13), 2.4) * 4,
      speed: 0.72 + noise(index + 29) * 0.72,
      wave: noise(index + 67) * Math.PI * 2,
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
        const centerX = (0.58 + progress * 0.02 + arch * 0.29) * width
        const centerY = (-0.1 + progress * 1.2) * height
        const derivativeX = (0.02 + progress * 0.58) * width
        const derivativeY = 1.2 * height
        const tangentLength = Math.hypot(derivativeX, derivativeY)
        const normalX = -derivativeY / tangentLength
        const normalY = derivativeX / tangentLength
        const fieldWidth = Math.min(width * 0.23, 310)
        const turbulence =
          Math.sin(elapsed * 0.85 + particle.wave + progress * 14) *
          (8 + Math.abs(particle.offset) * 22)
        const distance = particle.offset * fieldWidth + turbulence
        const x =
          centerX +
          normalX * distance +
          Math.sin(particle.wave + progress * 31) * 4 +
          pointer.x * (8 + Math.abs(particle.offset) * 16)
        const y =
          centerY +
          normalY * distance +
          Math.cos(particle.wave + progress * 23) * 5 +
          pointer.y * (5 + Math.abs(particle.offset) * 10)
        const perspective = 0.58 + progress * 0.72
        const size = particle.size * perspective

        context.globalAlpha = particle.opacity * (0.55 + progress * 0.45)
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
