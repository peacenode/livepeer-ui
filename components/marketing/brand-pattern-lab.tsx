"use client"

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react"
import {
  Color,
  Matrix4,
  PMREMGenerator,
  type Group,
  type InstancedMesh,
  type SpotLight,
} from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

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

function PatternBlock({
  block,
  depth,
  mode,
  spacing,
}: {
  block: (typeof symbolBlocks)[number]
  depth: number
  mode: PatternMode
  spacing: number
}) {
  const mesh = useRef<InstancedMesh>(null)
  const geometry = useMemo(
    () => new RoundedBoxGeometry(0.34, 0.34, depth, 2, 0.012),
    [depth]
  )
  const instances = useMemo(() => {
    const positions: [number, number, number][] = []
    const xGap = 2.1 * spacing
    const yGap = 2.35 * spacing

    for (let row = -3; row <= 3; row += 1) {
      for (let column = -5; column <= 5; column += 1) {
        const stagger = mode === "stagger" && Math.abs(row) % 2 === 1 ? 1.05 : 0
        const wave =
          mode === "wave"
            ? Math.sin(column * 0.78 + row * 0.52) * 0.34
            : 0
        const diagonal = mode === "grid" ? 0 : row * 0.08

        positions.push([
          column * xGap + stagger + block[0],
          row * yGap + wave + block[1],
          diagonal + Math.sin(column * 0.58 + row * 0.31) * 0.12,
        ])
      }
    }

    return positions
  }, [block, mode, spacing])

  useLayoutEffect(() => {
    if (!mesh.current) return

    const matrix = new Matrix4()
    instances.forEach((position, index) => {
      matrix.makeTranslation(...position)
      mesh.current?.setMatrixAt(index, matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [instances])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, undefined, instances.length]}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={new Color("#008f5c")}
        metalness={0.78}
        roughness={0.2}
        clearcoat={0.92}
        clearcoatRoughness={0.08}
        envMapIntensity={1.35}
      />
    </instancedMesh>
  )
}

function PatternScene({
  settings,
}: {
  settings: PatternSettings
}) {
  const group = useRef<Group>(null)
  const keyLight = useRef<SpotLight>(null)

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
  })

  return (
    <>
      <StudioEnvironment />
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.055} />
      <spotLight
        ref={keyLight}
        color="#f4fff9"
        position={[-8, 7, 8]}
        intensity={95}
        angle={0.34}
        penumbra={0.16}
        decay={1.6}
        distance={32}
        castShadow
      />
      <directionalLight
        color="#00c077"
        position={[8, -5, 5]}
        intensity={1.8}
      />
      <group
        ref={group}
        rotation={[
          (-settings.tilt * Math.PI) / 180,
          (settings.tilt * Math.PI) / 360,
          -0.025,
        ]}
      >
        {symbolBlocks.map((block) => (
          <PatternBlock
            block={block}
            depth={settings.depth}
            key={block.join("-")}
            mode={settings.mode}
            spacing={settings.spacing}
          />
        ))}
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
