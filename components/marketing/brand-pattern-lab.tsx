"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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

type PatternMode = "stagger" | "radial" | "diamond"

type PatternOrigin = {
  rotation: number
  x: number
  y: number
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
  halfWidth: number,
  halfHeight: number
) {
  const origins: PatternOrigin[] = []

  if (mode === "radial") {
    origins.push({ x: 0, y: 0, rotation: 0 })

    for (let radius = 0.78; radius <= halfWidth + 1; radius += 0.78) {
      const count = Math.max(6, Math.round((Math.PI * 2 * radius) / 0.92))

      for (let index = 0; index < count; index += 1) {
        const angle = (index / count) * Math.PI * 2
        origins.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * 0.56,
          rotation: angle + Math.PI / 2,
        })
      }
    }

    return origins
  }

  const xGap = mode === "diamond" ? 0.82 : 1.02
  const yGap = mode === "diamond" ? 0.82 : 1.08
  const columns = Math.ceil(halfWidth / xGap) + 2
  const rows = Math.ceil(halfHeight / yGap) + 2

  for (let row = -rows; row <= rows; row += 1) {
    for (let column = -columns; column <= columns; column += 1) {
      origins.push({
        x:
          column * xGap +
          (Math.abs(row) % 2 === 1 ? xGap / 2 : 0),
        y: row * yGap,
        rotation: mode === "diamond" ? Math.PI / 4 : 0,
      })
    }
  }

  return origins
}

function PerforatedSurface({ mode }: { mode: PatternMode }) {
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

    const symbolScale = 0.47
    const holeSize = 0.16
    const origins = createPatternOrigins(mode, halfWidth, halfHeight)

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
  }, [mode])

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

function PatternScene({ mode }: { mode: PatternMode }) {
  const keyLight = useRef<SpotLight>(null)
  const apertureLight = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.34
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
          (-18 * Math.PI) / 180,
          (18 * Math.PI) / 360,
          -0.025,
        ]}
      >
        <PerforatedSurface mode={mode} />
      </group>
    </>
  )
}

export function BrandPatternLab() {
  const [mode, setMode] = useState<PatternMode>("stagger")

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
          <PatternScene mode={mode} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[10px] font-medium tracking-widest text-white/45 uppercase">
          <span>Livepeer pattern study</span>
          <span>16:9</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-y py-5">
        {(["stagger", "radial", "diamond"] as const).map((pattern) => (
          <Button
            key={pattern}
            size="sm"
            variant={mode === pattern ? "secondary" : "outline"}
            onClick={() => setMode(pattern)}
            className="capitalize"
          >
            {pattern}
          </Button>
        ))}
      </div>
    </section>
  )
}
