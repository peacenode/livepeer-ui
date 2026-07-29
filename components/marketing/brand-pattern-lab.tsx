"use client"

import { useEffect, useMemo, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
  ExtrudeGeometry,
  Path,
  Shape,
} from "three"

import { Button } from "@/components/ui/button"

type PatternMode = "stagger" | "radial"
type PatternSize = "medium" | "small" | "micro"
type LightPreset = "soft" | "focused" | "raking"

type PatternOrigin = {
  rotation: number
  x: number
  y: number
}

const patternSizes: Record<
  PatternSize,
  { gap: number; hole: number; symbol: number }
> = {
  medium: { gap: 1.02, hole: 0.16, symbol: 0.47 },
  small: { gap: 0.78, hole: 0.12, symbol: 0.36 },
  micro: { gap: 0.58, hole: 0.085, symbol: 0.265 },
}

const lightPresets: Record<
  LightPreset,
  {
    angle: number
    intensity: number
    penumbra: number
    position: [number, number, number]
  }
> = {
  soft: {
    angle: 0.58,
    intensity: 1450,
    penumbra: 0.28,
    position: [-5.5, 5, 7],
  },
  focused: {
    angle: 0.36,
    intensity: 1900,
    penumbra: 0.16,
    position: [-5.8, 4.6, 8],
  },
  raking: {
    angle: 0.48,
    intensity: 2400,
    penumbra: 0.14,
    position: [-8, 2.2, 3.8],
  },
}

const symbolBlocks = [
  [-0.46, 0.56],
  [-0.46, 0],
  [-0.46, -0.56],
  [0, 0.28],
  [0, -0.28],
  [0.46, 0],
] as const

function createSquareHole(
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  const half = size / 2
  const hole = new Path()
  const cosine = Math.cos(rotation)
  const sine = Math.sin(rotation)
  const corners = [
    [-half, -half],
    [-half, half],
    [half, half],
    [half, -half],
  ].map(([cornerX, cornerY]) => [
    x + cornerX * cosine - cornerY * sine,
    y + cornerX * sine + cornerY * cosine,
  ])

  hole.moveTo(corners[0][0], corners[0][1])
  corners.slice(1).forEach(([cornerX, cornerY]) => {
    hole.lineTo(cornerX, cornerY)
  })
  hole.closePath()

  return hole
}

function createPatternOrigins(
  mode: PatternMode,
  gap: number,
  halfWidth: number,
  halfHeight: number
) {
  const origins: PatternOrigin[] = []

  if (mode === "radial") {
    let ring = 0

    for (
      let radius = gap * 1.9;
      radius <= halfWidth + gap;
      radius += gap * 0.96
    ) {
      const count = Math.max(
        8,
        Math.round((Math.PI * 2 * radius) / (gap * 1.12))
      )
      const offset = ring % 2 === 0 ? 0 : Math.PI / count

      for (let index = 0; index < count; index += 1) {
        const angle = (index / count) * Math.PI * 2 + offset
        origins.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: angle,
        })
      }

      ring += 1
    }

    return origins
  }

  const xGap = gap
  const yGap = gap * 1.06
  const columns = Math.ceil(halfWidth / xGap) + 2
  const rows = Math.ceil(halfHeight / yGap) + 2

  for (let row = -rows; row <= rows; row += 1) {
    for (let column = -columns; column <= columns; column += 1) {
      origins.push({
        x:
          column * xGap +
          (Math.abs(row) % 2 === 1 ? xGap / 2 : 0),
        y: row * yGap,
        rotation: 0,
      })
    }
  }

  return origins
}

function PerforatedSurface({
  mode,
  size,
}: {
  mode: PatternMode
  size: PatternSize
}) {
  const geometry = useMemo(() => {
    const width = 17.4
    const height = 9.8
    const depth = 0.28
    const halfWidth = width / 2
    const halfHeight = height / 2
    const shape = new Shape()

    shape.moveTo(-halfWidth, -halfHeight)
    shape.lineTo(halfWidth, -halfHeight)
    shape.lineTo(halfWidth, halfHeight)
    shape.lineTo(-halfWidth, halfHeight)
    shape.closePath()

    const scale = patternSizes[size]
    const symbolScale = scale.symbol
    const holeSize = scale.hole
    const origins = createPatternOrigins(
      mode,
      scale.gap,
      halfWidth,
      halfHeight
    )

    origins.forEach(({ rotation, x: originX, y: originY }) => {
      const cosine = Math.cos(rotation)
      const sine = Math.sin(rotation)

      symbolBlocks.forEach(([blockX, blockY]) => {
        const scaledX = blockX * symbolScale
        const scaledY = blockY * symbolScale
        const x = originX + scaledX * cosine - scaledY * sine
        const y = originY + scaledX * sine + scaledY * cosine
        const inset = holeSize / 2 + 0.08

        if (
          Math.abs(x) < halfWidth - inset &&
          Math.abs(y) < halfHeight - inset
        ) {
          shape.holes.push(createSquareHole(x, y, holeSize, rotation))
        }
      })
    })

    const nextGeometry = new ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: Math.min(0.018, depth * 0.09),
      bevelThickness: Math.min(0.016, depth * 0.08),
      curveSegments: 1,
      steps: 1,
    })

    nextGeometry.translate(0, 0, -depth / 2)
    nextGeometry.computeVertexNormals()

    return nextGeometry
  }, [mode, size])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#010302"
        metalness={0.86}
        roughness={0.3}
        clearcoat={0.64}
        clearcoatRoughness={0.16}
        envMapIntensity={0.48}
      />
    </mesh>
  )
}

function PatternScene({
  light,
  mode,
  size,
}: {
  light: LightPreset
  mode: PatternMode
  size: PatternSize
}) {
  const lighting = lightPresets[light]

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <spotLight
        color="#f4fff9"
        position={lighting.position}
        intensity={lighting.intensity}
        angle={lighting.angle}
        penumbra={lighting.penumbra}
        decay={1}
        distance={0}
        castShadow
      />
      <group
        rotation={[
          (-18 * Math.PI) / 180,
          (18 * Math.PI) / 360,
          -0.025,
        ]}
      >
        <PerforatedSurface mode={mode} size={size} />
      </group>
    </>
  )
}

export function BrandPatternLab() {
  const [mode, setMode] = useState<PatternMode>("stagger")
  const [size, setSize] = useState<PatternSize>("micro")
  const [light, setLight] = useState<LightPreset>("soft")

  return (
    <section className="mt-8">
      <div
        className="relative aspect-video overflow-hidden rounded-sm border bg-black"
        data-pattern-canvas
      >
        <Canvas
          shadows
          orthographic
          camera={{ position: [0, 0, 18], zoom: 72 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance",
          }}
        >
          <PatternScene light={light} mode={mode} size={size} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[10px] font-medium tracking-widest text-white/45 uppercase">
          <span>Livepeer pattern study</span>
          <span>16:9</span>
        </div>
      </div>

      <div className="mt-5 grid gap-5 border-y py-5 sm:grid-cols-3">
        <OptionGroup
          label="Pattern"
          options={["stagger", "radial"]}
          value={mode}
          onChange={setMode}
        />
        <OptionGroup
          label="Size"
          options={["medium", "small", "micro"]}
          value={size}
          onChange={setSize}
        />
        <OptionGroup
          label="Light"
          options={["soft", "focused", "raking"]}
          value={light}
          onChange={setLight}
        />
      </div>
    </section>
  )
}

function OptionGroup<Option extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (option: Option) => void
  options: readonly Option[]
  value: Option
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={value === option ? "secondary" : "outline"}
            onClick={() => onChange(option)}
            className="capitalize"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
