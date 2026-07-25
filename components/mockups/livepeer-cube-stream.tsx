"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const desktopParticleCount = 5000
const mobileParticleCount = 1000
const particleSize = 4
const colors = ["#15191a", "#596164", "#9ca5a2", "#cbd2ce", "#00a86b"]

type Particle = {
  color: string
  offset: number
  phase: number
  speed: number
}

function noise(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

function smoothstep(min: number, max: number, value: number) {
  const progress = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return progress * progress * (3 - 2 * progress)
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    color: colors[Math.floor(noise(index + 41) * colors.length)],
    offset: noise(index + 19) * 2 - 1,
    phase: (index + noise(index + 3) * 0.8) / count,
    speed: 0.82 + noise(index + 29) * 0.36,
  }))
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
    let gridColumns = 0
    let gridRows = 0
    let occupancy = new Uint8Array()
    let particles: Particle[] = []
    let start = performance.now()
    let width = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      gridColumns = Math.ceil(width / particleSize)
      gridRows = Math.ceil(height / particleSize)
      occupancy = new Uint8Array(gridColumns * gridRows)
      particles = makeParticles(
        width < 640 ? mobileParticleCount : desktopParticleCount
      )
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      occupancy.fill(0)

      const elapsed = reduceMotion ? 2.4 : (time - start) / 1000
      const isMobile = width < 640
      const fieldCenterY = height * 0.5 + pointer.y * 12

      for (const particle of particles) {
        if (isMobile) {
          const progress =
            (1 - particle.phase + elapsed * 0.105 * particle.speed + 10) % 1
          const turbulenceSeed = particle.phase * mobileParticleCount
          const x = (-0.16 + progress * 1.32) * width
          const centerY =
            height * 0.84 - Math.sin(progress * Math.PI) * height * 0.025
          const fan = 0.5 + Math.abs(progress - 0.5) * 0.72
          const y =
            centerY +
            particle.offset * 46 * fan +
            Math.sin(progress * 18 + turbulenceSeed * 0.13) * 5 +
            Math.sin(progress * 41 + turbulenceSeed * 0.29) * 2
          const gridX = Math.round(x / particleSize)
          const gridY = Math.round(y / particleSize)

          if (
            gridX >= 0 &&
            gridX < gridColumns &&
            gridY >= 0 &&
            gridY < gridRows
          ) {
            const occupancyIndex = gridY * gridColumns + gridX

            if (occupancy[occupancyIndex] === 0) {
              occupancy[occupancyIndex] = 1
              context.fillStyle = particle.color
              context.fillRect(
                x - particleSize / 2,
                y - particleSize / 2,
                particleSize,
                particleSize
              )
            }
          }

          continue
        }

        const progress =
          (particle.phase - elapsed * 0.105 * particle.speed + 10) % 1
        const y = (-0.18 + progress * 1.36) * height
        const fieldY = y - fieldCenterY
        const normalizedY = fieldY / (height * 0.5)
        const distanceFromCenter = Math.min(1, Math.abs(normalizedY))
        const expansion = smoothstep(0.08, 0.88, distanceFromCenter)
        const centerX =
          width * 0.73 +
          pointer.x * 18 +
          Math.sin(normalizedY * Math.PI * 0.82) * width * 0.055 +
          Math.sin(normalizedY * Math.PI * 2.1) * width * 0.012
        const throatWidth = Math.max(28, width * 0.025)
        const lobeWidth = Math.min(width * 0.21, 320)
        const flowWidth =
          throatWidth +
          (lobeWidth - throatWidth) *
            (0.18 * distanceFromCenter + 0.82 * expansion)
        const edgeSoftening = 0.86 + 0.14 * (1 - particle.offset ** 2)
        const lateralOffset = particle.offset * flowWidth * edgeSoftening
        const turbulenceStrength = 0.22 + expansion * 0.78
        const turbulenceSeed = particle.phase * desktopParticleCount
        const curlX =
          (Math.sin(normalizedY * 13 + turbulenceSeed * 0.17) * 10 +
            Math.sin(normalizedY * 31 + turbulenceSeed * 0.43) * 4) *
          turbulenceStrength
        const curlY =
          (Math.cos(normalizedY * 11 + turbulenceSeed * 0.31) * 6 +
            Math.sin(normalizedY * 27 + turbulenceSeed * 0.11) * 2.5) *
          turbulenceStrength
        const x = centerX + lateralOffset + curlX
        const renderedY = y + curlY
        const gridX = Math.round(x / particleSize)
        const gridY = Math.round(renderedY / particleSize)

        if (
          gridX >= 0 &&
          gridX < gridColumns &&
          gridY >= 0 &&
          gridY < gridRows
        ) {
          const occupancyIndex = gridY * gridColumns + gridX

          if (occupancy[occupancyIndex] === 0) {
            occupancy[occupancyIndex] = 1
            context.fillStyle = particle.color
            context.fillRect(
              x - particleSize / 2,
              renderedY - particleSize / 2,
              particleSize,
              particleSize
            )
          }
        }
      }

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
