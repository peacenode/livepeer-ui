"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const desktopParticleCount = 5000
const mobileParticleCount = 1600
const colors = ["#15191a", "#596164", "#9ca5a2", "#cbd2ce", "#00a86b"]

type Particle = {
  color: string
  speed: number
  streamOffset: number
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
    const fieldCenterX = width * (width < 640 ? 0.21 : 0.33)
    const fieldCenterY = height * 0.56
    const fieldRadius =
      width < 640 ? width * 0.92 : Math.min(width * 0.36, height * 0.54)
    let x = centerX + spread
    let y = (-0.24 + progress * 1.58) * height
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
      streamOffset: noise(index + 19) * 2 - 1,
      wave: noise(index + 67) * Math.PI * 2,
      vx: (noise(index + 73) - 0.5) * 0.18,
      vy: -(1.05 + noise(index + 79) * 0.95),
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
    const pointer = { x: 0, y: 0 }
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
        : Math.min(1.25, Math.max(0.25, (time - previousTime) / 16.667))
      previousTime = time
      const fieldCenterX = width * (width < 640 ? 0.21 : 0.33) + pointer.x * 18
      const fieldCenterY = height * 0.56 + pointer.y * 12
      const fieldRadius =
        width < 640 ? width * 0.92 : Math.min(width * 0.36, height * 0.54)
      const influenceRadius = fieldRadius + Math.min(width * 0.1, 130)
      const particleSize = 3

      for (const particle of particles) {
        const streamProgress = Math.max(
          0,
          Math.min(1, (particle.y / height + 0.26) / 1.6)
        )
        const guideX = (0.4 + streamProgress * streamProgress * 0.45) * width
        const guideWidth =
          Math.min(width * 0.24, 330) * (0.72 + streamProgress * 0.28)
        const targetX = guideX + particle.streamOffset * guideWidth
        const curveSlope = (2 * 0.45 * streamProgress * width) / (1.6 * height)
        const targetVx = curveSlope * particle.vy
        const waveX = Math.sin(elapsed * 1.4 + particle.wave) * 0.0015
        const waveY = Math.cos(elapsed * 1.1 + particle.wave) * 0.001
        const fieldX = particle.x - fieldCenterX
        const fieldY = particle.y - fieldCenterY
        const fieldDistance = Math.max(1, Math.hypot(fieldX, fieldY))

        if (fieldDistance < influenceRadius) {
          const proximity = 1 - fieldDistance / influenceRadius
          const radialX = fieldX / fieldDistance
          const radialY = fieldY / fieldDistance
          const radialError = fieldDistance - fieldRadius
          const radialForce = radialError * 0.00011 * proximity
          const orbitForce = proximity * proximity * 0.09
          const throatDistance = fieldY / (fieldRadius * 0.48)
          const compression =
            Math.exp(-(throatDistance * throatDistance)) * 0.34
          const seamX = fieldCenterX + radialX * fieldRadius
          const seamY = fieldCenterY + radialY * fieldRadius

          particle.x += (seamX - particle.x) * compression * delta
          particle.y += (seamY - particle.y) * compression * delta

          if (fieldDistance < fieldRadius) {
            particle.x = fieldCenterX + radialX * fieldRadius
            particle.y = fieldCenterY + radialY * fieldRadius

            const inwardVelocity = particle.vx * radialX + particle.vy * radialY

            if (inwardVelocity < 0) {
              particle.vx -= inwardVelocity * radialX
              particle.vy -= inwardVelocity * radialY
            }
          }

          // The demo combines radial gravity with a stronger perpendicular
          // force. Here the target radius protects the copy while the
          // clockwise tangent carries the current upward around it.
          particle.vx += (-radialX * radialForce + radialY * orbitForce) * delta
          particle.vy += (-radialY * radialForce - radialX * orbitForce) * delta
        }

        const exitProgress = Math.max(
          0,
          Math.min(1, (fieldCenterY - particle.y) / (fieldRadius * 0.9))
        )
        const guideStrength =
          fieldDistance < influenceRadius
            ? 0.08 + exitProgress * exitProgress * 0.92
            : 1
        particle.vx +=
          ((targetX - particle.x) * 0.00016 +
            (targetVx - particle.vx) * 0.04 +
            waveX) *
          guideStrength *
          delta
        particle.vy += (-0.012 * particle.speed + waveY) * delta
        particle.vx *= Math.pow(0.996, delta)
        particle.vy *= Math.pow(0.996, delta)
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta

        if (
          particle.y < -height * 0.26 ||
          particle.x < -width * 0.25 ||
          particle.x > width * 1.25
        ) {
          const spread = (noise(particle.wave + time) * 2 - 1) * width * 0.18
          particle.x = width * 0.7 + spread
          particle.y = height * (1.18 + noise(particle.wave + 11) * 0.16)
          particle.vx = -0.08 - noise(particle.wave + 17) * 0.18
          particle.vy = -(1.05 + particle.speed * 0.68)
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
