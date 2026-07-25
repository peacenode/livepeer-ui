"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const desktopParticleCount = 1800
const mobileParticleCount = 650
const colors = ["#15191a", "#596164", "#9ca5a2", "#cbd2ce", "#00a86b"]

type Particle = {
  color: string
  speed: number
  wave: number
  vx: number
  vy: number
  x: number
  y: number
}

function noise(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

function makeParticles(
  count: number,
  width: number,
  height: number
): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const progress = noise(index + 3)
    const arch = progress * progress
    const centerX = (0.46 + progress * 0.12 + arch * 0.3) * width
    const spread = (noise(index + 19) * 2 - 1) * Math.min(width * 0.25, 340)
    const fieldCenterX = width * (width < 640 ? 0.18 : 0.3)
    const fieldCenterY = height * 0.5
    const fieldRadius =
      width < 640 ? width * 0.92 : Math.min(width * 0.36, height * 0.54)
    let x = centerX + spread
    let y = (-0.1 + progress * 1.2) * height
    const fieldX = x - fieldCenterX
    const fieldY = y - fieldCenterY
    const distance = Math.max(1, Math.hypot(fieldX, fieldY))

    if (distance < fieldRadius) {
      x = fieldCenterX + (fieldX / distance) * fieldRadius
      y = fieldCenterY + (fieldY / distance) * fieldRadius
    }

    return {
      color: colors[Math.floor(noise(index + 41) * colors.length)],
      speed: 0.72 + noise(index + 29) * 0.72,
      wave: noise(index + 67) * Math.PI * 2,
      vx: (noise(index + 73) - 0.5) * 0.18,
      vy: -(0.9 + noise(index + 79) * 0.85),
      x,
      y,
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
    let frame = 0
    let height = 0
    let width = 0
    let particles: Particle[] = []
    let start = performance.now()
    let previousTime = start

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = makeParticles(
        width < 640 ? mobileParticleCount : desktopParticleCount,
        width,
        height
      )
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)

      const elapsed = reduceMotion ? 2.8 : (time - start) / 1000
      const delta = reduceMotion
        ? 0
        : Math.min(2, Math.max(0.25, (time - previousTime) / 16.667))
      previousTime = time
      const fieldCenterX = width * (width < 640 ? 0.18 : 0.3)
      const fieldCenterY = height * 0.5
      const fieldRadius =
        width < 640 ? width * 0.92 : Math.min(width * 0.42, height * 0.78)
      const influenceRadius = fieldRadius + Math.min(width * 0.1, 130)
      const particleSize = width < 640 ? 2 : 3

      for (const particle of particles) {
        const waveX = Math.sin(elapsed * 1.4 + particle.wave) * 0.004
        const waveY = Math.cos(elapsed * 1.1 + particle.wave) * 0.003
        const fieldX = particle.x - fieldCenterX
        const fieldY = particle.y - fieldCenterY
        const fieldDistance = Math.max(1, Math.hypot(fieldX, fieldY))

        const approachDistance = Math.min(width * 0.28, 360)
        const approachProgress = Math.max(
          0,
          1 - (fieldDistance - influenceRadius) / approachDistance
        )

        if (approachProgress > 0) {
          const proximity =
            fieldDistance < influenceRadius
              ? 1 - fieldDistance / influenceRadius
              : approachProgress * 0.16
          const radialX = fieldX / fieldDistance
          const radialY = fieldY / fieldDistance
          const radialError = fieldDistance - fieldRadius
          const radialForce = radialError * 0.000035 * proximity
          const orbitForce = proximity * proximity * 0.06

          // The demo combines radial gravity with a stronger perpendicular
          // force. Here the target radius protects the copy while the
          // clockwise tangent carries the current upward around it.
          particle.vx += (-radialX * radialForce + radialY * orbitForce) * delta
          particle.vy += (-radialY * radialForce - radialX * orbitForce) * delta
        }

        particle.vx += waveX * delta
        particle.vy += (-0.012 * particle.speed + waveY) * delta
        particle.vx *= Math.pow(0.992, delta)
        particle.vy *= Math.pow(0.992, delta)
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta

        const nextFieldX = particle.x - fieldCenterX
        const nextFieldY = particle.y - fieldCenterY
        const nextFieldDistance = Math.max(
          1,
          Math.hypot(nextFieldX, nextFieldY)
        )

        if (nextFieldDistance < fieldRadius) {
          const normalX = nextFieldX / nextFieldDistance
          const normalY = nextFieldY / nextFieldDistance
          const inwardVelocity = particle.vx * normalX + particle.vy * normalY

          particle.x = fieldCenterX + normalX * fieldRadius
          particle.y = fieldCenterY + normalY * fieldRadius

          if (inwardVelocity < 0) {
            particle.vx -= inwardVelocity * normalX
            particle.vy -= inwardVelocity * normalY
          }
        }

        if (
          particle.y < -height * 0.16 ||
          particle.x < -width * 0.25 ||
          particle.x > width * 1.25
        ) {
          const spread = (noise(particle.wave + time) * 2 - 1) * width * 0.18
          particle.x = width * 0.7 + spread
          particle.y = height * (1.04 + noise(particle.wave + 11) * 0.12)
          particle.vx = -0.08 - noise(particle.wave + 17) * 0.18
          particle.vy = -(0.9 + particle.speed * 0.58)
        }

        context.globalAlpha = 1
        context.fillStyle = particle.color
        context.fillRect(
          Math.round(particle.x - particleSize / 2),
          Math.round(particle.y - particleSize / 2),
          particleSize,
          particleSize
        )
      }

      context.globalAlpha = 1
      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    start = performance.now()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
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
