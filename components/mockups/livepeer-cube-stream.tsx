"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  CatmullRomCurve3,
  Color,
  InstancedMesh,
  MeshPhysicalMaterial,
  Object3D,
  PMREMGenerator,
  TubeGeometry,
  Vector3,
} from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

import { cn } from "@/lib/utils"

const laneCount = 6
const segmentsPerLane = 34

type Layer = "glass" | "graphite" | "prism"

type StreamSeed = {
  jitter: number
  lane: number
  layer: Layer
  scale: number
  slot: number
  spin: number
}

function seededNoise(value: number) {
  return Math.sin(value * 91.733) * 0.5 + 0.5
}

const seeds = Array.from(
  { length: laneCount * segmentsPerLane },
  (_, index): StreamSeed => {
    const lane = index % laneCount
    const slot = Math.floor(index / laneCount)
    const materialIndex = (slot * 5 + lane * 3) % 10

    return {
      lane,
      slot,
      layer:
        materialIndex < 5
          ? "glass"
          : materialIndex < 8
            ? "graphite"
            : "prism",
      jitter: seededNoise(index + 4.2) - 0.5,
      scale: 0.78 + seededNoise(index + 12.8) * 0.48,
      spin: seededNoise(index + 31.4) * Math.PI,
    }
  }
)

const seedsByLayer: Record<Layer, StreamSeed[]> = {
  glass: seeds.filter((seed) => seed.layer === "glass"),
  graphite: seeds.filter((seed) => seed.layer === "graphite"),
  prism: seeds.filter((seed) => seed.layer === "prism"),
}

function streamPosition(
  lane: number,
  progress: number,
  width: number,
  height: number
) {
  const lanePosition = (lane - (laneCount - 1) / 2) / ((laneCount - 1) / 2)
  // Follow the source artwork's accelerating arch: nearly vertical at the
  // crown, then opening decisively toward the lower-right.
  const arch = progress * progress
  const spread = (0.035 + progress * 0.09 + arch * 0.025) * lanePosition
  const center = -0.04 + progress * 0.14 + arch * 0.44

  return {
    x: (center + spread) * width,
    y: (0.65 - progress * 1.3) * height,
    z:
      -0.68 +
      Math.sin(progress * Math.PI) * 0.44 +
      lanePosition * 0.16,
  }
}

function StreamEnvironment() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const generator = new PMREMGenerator(gl)
    const environment = generator.fromScene(new RoomEnvironment(), 0.035)

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

function FiberLanes() {
  const { viewport } = useThree()
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: new Color("#c8cdd0"),
        clearcoat: 0.72,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.1,
        metalness: 0.36,
        roughness: 0.42,
      }),
    []
  )
  const geometries = useMemo(
    () =>
      Array.from({ length: laneCount }, (_, lane) => {
        const points = Array.from({ length: 13 }, (__, index) => {
          const progress = index / 12
          const point = streamPosition(
            lane,
            progress,
            viewport.width,
            viewport.height
          )

          return new Vector3(point.x, point.y, point.z - 0.12)
        })

        return new TubeGeometry(
          new CatmullRomCurve3(points),
          72,
          0.008,
          6,
          false
        )
      }),
    [viewport.height, viewport.width]
  )

  useEffect(
    () => () => {
      geometries.forEach((geometry) => geometry.dispose())
      material.dispose()
    },
    [geometries, material]
  )

  return geometries.map((geometry, index) => (
    <mesh geometry={geometry} material={material} key={index} />
  ))
}

function StreamInstances({ reduceMotion }: { reduceMotion: boolean }) {
  const glass = useRef<InstancedMesh>(null)
  const graphite = useRef<InstancedMesh>(null)
  const prism = useRef<InstancedMesh>(null)
  const { size, viewport } = useThree()
  const dummy = useMemo(() => new Object3D(), [])
  const geometry = useMemo(
    () => new RoundedBoxGeometry(0.105, 0.105, 0.105, 3, 0.012),
    []
  )
  const materials = useMemo(
    () => ({
      glass: new MeshPhysicalMaterial({
        color: new Color("#edf0ee"),
        clearcoat: 0.94,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.45,
        metalness: 0.18,
        roughness: 0.2,
      }),
      graphite: new MeshPhysicalMaterial({
        color: new Color("#555b62"),
        clearcoat: 0.95,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.65,
        metalness: 0.78,
        roughness: 0.2,
      }),
      prism: new MeshPhysicalMaterial({
        color: new Color("#aeb9d9"),
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.7,
        iridescence: 0.72,
        iridescenceIOR: 1.55,
        iridescenceThicknessRange: [160, 460],
        metalness: 0.34,
        roughness: 0.16,
      }),
    }),
    []
  )

  useEffect(
    () => () => {
      geometry.dispose()
      Object.values(materials).forEach((material) => material.dispose())
    },
    [geometry, materials]
  )

  useFrame(({ clock, pointer }) => {
    const elapsed = reduceMotion ? 0 : clock.getElapsedTime()
    const travel = reduceMotion ? 0.16 : elapsed * 0.018
    const mobileScale = size.width < 640 ? 0.66 : 1
    const activeStride = size.width < 640 ? 2 : 1

    const updateLayer = (
      mesh: InstancedMesh | null,
      layerSeeds: StreamSeed[]
    ) => {
      if (!mesh) return

      layerSeeds.forEach((seed, index) => {
        if (seed.slot % activeStride !== 0) {
          dummy.scale.setScalar(0)
          dummy.updateMatrix()
          mesh.setMatrixAt(index, dummy.matrix)
          return
        }

        const progress =
          (seed.slot / segmentsPerLane + seed.lane * 0.012 + travel) % 1
        const position = streamPosition(
          seed.lane,
          progress,
          viewport.width,
          viewport.height
        )
        const nextPosition = streamPosition(
          seed.lane,
          Math.min(progress + 0.002, 1),
          viewport.width,
          viewport.height
        )
        const tangent = Math.atan2(
          nextPosition.y - position.y,
          nextPosition.x - position.x
        )
        const perspective = 0.42 + progress * 1.05
        const pulse =
          1 + Math.sin(elapsed * 0.85 + seed.spin) * 0.045 * (1 - progress)

        dummy.position.set(
          position.x + pointer.x * 0.035 * viewport.width,
          position.y + pointer.y * 0.025 * viewport.height,
          position.z + seed.jitter * 0.18
        )
        dummy.rotation.set(
          seed.spin + elapsed * 0.08,
          seed.spin * 0.62 + elapsed * 0.12,
          tangent + seed.jitter * 0.16
        )
        dummy.scale.setScalar(
          perspective * seed.scale * pulse * mobileScale
        )
        dummy.updateMatrix()
        mesh.setMatrixAt(index, dummy.matrix)
      })

      mesh.instanceMatrix.needsUpdate = true
    }

    updateLayer(glass.current, seedsByLayer.glass)
    updateLayer(graphite.current, seedsByLayer.graphite)
    updateLayer(prism.current, seedsByLayer.prism)
  })

  return (
    <>
      <instancedMesh
        ref={glass}
        args={[geometry, materials.glass, seedsByLayer.glass.length]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={graphite}
        args={[geometry, materials.graphite, seedsByLayer.graphite.length]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={prism}
        args={[geometry, materials.prism, seedsByLayer.prism.length]}
        frustumCulled={false}
      />
    </>
  )
}

function LivepeerCubeStream({ className }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(motionQuery.matches)

    updatePreference()
    motionQuery.addEventListener("change", updatePreference)

    return () => motionQuery.removeEventListener("change", updatePreference)
  }, [])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 34 }}
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <StreamEnvironment />
        <ambientLight intensity={0.48} />
        <directionalLight
          color="#e9f5ff"
          position={[-4, 5, 6]}
          intensity={4.6}
        />
        <directionalLight
          color="#d9fff1"
          position={[5, -3, 4]}
          intensity={2.8}
        />
        <pointLight color="#c9c3ff" position={[2, 1, 4]} intensity={8} />
        <FiberLanes />
        <StreamInstances reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}

export { LivepeerCubeStream }
