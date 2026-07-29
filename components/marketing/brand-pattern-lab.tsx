"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react"
import {
  ExtrudeGeometry,
  Path,
  PMREMGenerator,
  type PointLight,
  Shape,
  type SpotLight,
} from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

type PatternMode = "grid" | "stagger" | "wave"

type PatternSettings = {
  depth: number
  light: number
  mode: PatternMode
  playing: boolean
  spacing: number
  tilt: number
}

const defaultSettings: PatternSettings = {
  depth: 0.42,
  light: 18,
  mode: "stagger",
  playing: true,
  spacing: 1,
  tilt: 18,
}

const symbolBlocks = [
  [-0.46, 0.56],
  [-0.46, 0],
  [-0.46, -0.56],
  [0, 0.28],
  [0, -0.28],
  [0.46, 0],
] as const

function StudioEnvironment() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const generator = new PMREMGenerator(gl)
    const environment = generator.fromScene(new RoomEnvironment(), 0.04)

    // Three.js scene configuration is intentionally imperative.
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = environment.texture

    return () => {
      scene.environment = null
      environment.dispose()
      generator.dispose()
    }
  }, [gl, scene])

  return null
}

function createSquareHole(x: number, y: number, size: number) {
  const half = size / 2
  const hole = new Path()

  hole.moveTo(x - half, y - half)
  hole.lineTo(x - half, y + half)
  hole.lineTo(x + half, y + half)
  hole.lineTo(x + half, y - half)
  hole.closePath()

  return hole
}

function PerforatedSurface({
  depth,
  mode,
  spacing,
}: {
  depth: number
  mode: PatternMode
  spacing: number
}) {
  const geometry = useMemo(() => {
    const width = 17.4
    const height = 9.8
    const halfWidth = width / 2
    const halfHeight = height / 2
    const shape = new Shape()

    shape.moveTo(-halfWidth, -halfHeight)
    shape.lineTo(halfWidth, -halfHeight)
    shape.lineTo(halfWidth, halfHeight)
    shape.lineTo(-halfWidth, halfHeight)
    shape.closePath()

    const xGap = 2.06 * spacing
    const yGap = 2.18 * spacing
    const holeSize = 0.34

    for (let row = -2; row <= 2; row += 1) {
      for (let column = -4; column <= 4; column += 1) {
        const stagger =
          mode === "stagger" && Math.abs(row) % 2 === 1 ? xGap / 2 : 0
        const wave =
          mode === "wave"
            ? Math.sin(column * 0.82 + row * 0.55) * 0.38
            : 0
        const originX = column * xGap + stagger
        const originY = row * yGap + wave

        symbolBlocks.forEach(([blockX, blockY]) => {
          const x = originX + blockX
          const y = originY + blockY
          const inset = holeSize / 2 + 0.08

          if (
            Math.abs(x) < halfWidth - inset &&
            Math.abs(y) < halfHeight - inset
          ) {
            shape.holes.push(createSquareHole(x, y, holeSize))
          }
        })
      }
    }

    const nextGeometry = new ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: Math.min(0.045, depth * 0.18),
      bevelThickness: Math.min(0.04, depth * 0.16),
      curveSegments: 1,
      steps: 1,
    })

    nextGeometry.translate(0, 0, -depth / 2)
    nextGeometry.computeVertexNormals()

    return nextGeometry
  }, [depth, mode, spacing])

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
  settings,
}: {
  settings: PatternSettings
}) {
  const keyLight = useRef<SpotLight>(null)
  const apertureLight = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    const time = settings.playing
      ? clock.getElapsedTime() * 0.34
      : (settings.light / 100) * Math.PI * 2
    const lightX = Math.sin(time) * 11

    if (keyLight.current) {
      keyLight.current.position.set(lightX, 7, 8)
      keyLight.current.target.position.set(lightX * 0.32, 0, 0)
      keyLight.current.target.updateMatrixWorld()
    }
    if (apertureLight.current) {
      apertureLight.current.position.set(lightX * 0.72, -1.8, -2.2)
    }
  })

  return (
    <>
      <StudioEnvironment />
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.006} />
      <spotLight
        ref={keyLight}
        color="#f4fff9"
        position={[-8, 7, 8]}
        intensity={62}
        angle={0.25}
        penumbra={0.1}
        decay={1.6}
        distance={32}
        castShadow
      />
      <directionalLight
        color="#00c077"
        position={[8, -5, 5]}
        intensity={0.28}
      />
      <pointLight
        ref={apertureLight}
        color="#00c077"
        position={[-6, -2, -2]}
        intensity={24}
        distance={13}
        decay={1.7}
      />
      <group
        rotation={[
          (-settings.tilt * Math.PI) / 180,
          (settings.tilt * Math.PI) / 360,
          -0.025,
        ]}
      >
        <PerforatedSurface
          depth={settings.depth}
          mode={settings.mode}
          spacing={settings.spacing}
        />
      </group>
    </>
  )
}

function Control({
  label,
  max,
  min,
  onValueChange,
  step,
  value,
}: {
  label: string
  max: number
  min: number
  onValueChange: (value: number) => void
  step: number
  value: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="font-mono text-xs tabular-nums">
          {Number.isInteger(step) ? value : value.toFixed(2)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(nextValue) =>
          onValueChange(
            Array.isArray(nextValue) ? (nextValue[0] ?? value) : nextValue
          )
        }
        aria-label={label}
      />
    </div>
  )
}

export function BrandPatternLab() {
  const [settings, setSettings] = useState(defaultSettings)

  const update = <Key extends keyof PatternSettings>(
    key: Key,
    value: PatternSettings[Key]
  ) => setSettings((current) => ({ ...current, [key]: value }))

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
          <PatternScene settings={settings} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[10px] font-medium tracking-widest text-white/45 uppercase">
          <span>Livepeer pattern study</span>
          <span>16:9</span>
        </div>
      </div>

      <div className="mt-5 grid gap-6 border-y py-5 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Label className="text-xs text-muted-foreground">Pattern</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["grid", "stagger", "wave"] as const).map((mode) => (
              <Button
                key={mode}
                size="sm"
                variant={settings.mode === mode ? "secondary" : "outline"}
                onClick={() => update("mode", mode)}
                className="capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => update("playing", !settings.playing)}
            >
              {settings.playing ? <PauseIcon /> : <PlayIcon />}
              {settings.playing ? "Pause light" : "Play light"}
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Reset pattern"
              onClick={() => setSettings(defaultSettings)}
            >
              <RotateCcwIcon />
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          <Control
            label="Spacing"
            min={0.72}
            max={1.38}
            step={0.01}
            value={settings.spacing}
            onValueChange={(value) => update("spacing", value)}
          />
          <Control
            label="Extrusion"
            min={0.08}
            max={0.9}
            step={0.01}
            value={settings.depth}
            onValueChange={(value) => update("depth", value)}
          />
        </div>

        <div className="space-y-5">
          <Control
            label="Surface tilt"
            min={-6}
            max={34}
            step={1}
            value={settings.tilt}
            onValueChange={(value) => update("tilt", value)}
          />
          <Control
            label="Light position"
            min={0}
            max={100}
            step={1}
            value={settings.light}
            onValueChange={(value) => {
              update("playing", false)
              update("light", value)
            }}
          />
        </div>
      </div>
    </section>
  )
}
