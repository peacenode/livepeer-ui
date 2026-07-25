"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const desktopParticleCount = 5000
const mobileParticleCount = 1600
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

function smoothMaximum(a: number, b: number, softness: number) {
  const high = Math.max(a, b)
  const low = Math.min(a, b)
  return high + Math.log1p(Math.exp((low - high) / softness)) * softness
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
      const fieldCenterX =
        width * (width < 640 ? 0.21 : 0.33) + pointer.x * 18
      const fieldCenterY = height * 0.56 + pointer.y * 12
      const fieldRadius =
        width < 640 ? width * 0.92 : Math.min(width * 0.36, height * 0.54)
      const streamWidth = Math.min(width * 0.23, 330)
      const transitionBand = fieldRadius * 0.24

      for (const particle of particles) {
        const progress =
          (particle.phase - elapsed * 0.105 * particle.speed + 10) % 1
        const y = (-0.26 + progress * 1.62) * height
        const baseX =
          (0.4 + progress * progress * 0.45) * width
        const fieldY = y - fieldCenterY
        const absoluteFieldY = Math.abs(fieldY)
        const circleReach = fieldRadius + transitionBand
        const circleBlend =
          1 - smoothstep(fieldRadius * 0.72, circleReach, absoluteFieldY)
        const boundaryX =
          fieldCenterX +
          Math.sqrt(
            Math.max(
              0,
              fieldRadius * fieldRadius - fieldY * fieldY
            )
          )
        const centerX = smoothMaximum(
          baseX,
          boundaryX,
          Math.max(8, width * 0.012)
        )

        // Density rises continuously toward the throat, then releases with
        // the same curve. No particles snap and no velocity state accumulates.
        const throatDistance = fieldY / (fieldRadius * 0.46)
        const compression = Math.exp(
          -(throatDistance * throatDistance)
        )
        const widthScale = 1 - compression * 0.965
        const naturalOffset =
          particle.offset * streamWidth * (0.72 + progress * 0.28)
        const outsideOffset =
          ((particle.offset + 1) / 2) *
          streamWidth *
          (0.72 + progress * 0.28)
        const lateralOffset =
          naturalOffset * (1 - circleBlend) +
          outsideOffset * circleBlend
        const turbulenceStrength = 1 - compression * 0.92
        const turbulenceSeed = particle.phase * desktopParticleCount
        const curlX =
          (Math.sin(progress * 29 + turbulenceSeed * 0.17) * 13 +
            Math.sin(progress * 67 + turbulenceSeed * 0.43) * 6) *
          turbulenceStrength
        const curlY =
          (Math.cos(progress * 23 + turbulenceSeed * 0.31) * 7 +
            Math.sin(progress * 53 + turbulenceSeed * 0.11) * 3) *
          turbulenceStrength
        const x = centerX + lateralOffset * widthScale + curlX
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
              gridX * particleSize,
              gridY * particleSize,
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
