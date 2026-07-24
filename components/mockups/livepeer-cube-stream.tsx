"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { DepthOfField, EffectComposer } from "@react-three/postprocessing"
import {
  Color,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshPhysicalMaterial,
  Object3D,
  PMREMGenerator,
} from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

import { cn } from "@/lib/utils"

const cubeCount = 72
const ingressPortion = 0.62
const routes = [
  {
    start: [-0.8, -0.58, 0.62],
    control: [-0.44, -0.3, 0.48],
  },
  {
    start: [-0.82, -0.16, 0.28],
    control: [-0.44, 0.12, 0.18],
  },
  {
    start: [-0.62, 0.38, -0.04],
    control: [-0.24, -0.12, -0.12],
  },
  {
    start: [-0.2, -0.68, 0.78],
    control: [-0.04, -0.36, 0.34],
  },
] as const
const join = [0.14, -0.03, -0.28] as const
const exitControl = [0.46, 0.08, -0.92] as const
const exit = [0.8, 0.62, -1.72] as const

function quadratic(a: number, b: number, c: number, t: number) {
  const inverse = 1 - t
  return inverse * inverse * a + 2 * inverse * t * b + t * t * c
}

function quadraticTangent(a: number, b: number, c: number, t: number) {
  return 2 * (1 - t) * (b - a) + 2 * t * (c - b)
}

function StreamEnvironment() {
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

function CubeFlow({ reduceMotion }: { reduceMotion: boolean }) {
  const mesh = useRef<InstancedMesh>(null)
  const { size, viewport } = useThree()
  const dummy = useMemo(() => new Object3D(), [])
  const matrix = useMemo(() => new Matrix4(), [])
  const geometry = useMemo(
    () => new RoundedBoxGeometry(0.11, 0.11, 0.11, 3, 0.012),
    []
  )
  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        anisotropy: 0.35,
        clearcoat: 0.8,
        clearcoatRoughness: 0.16,
        color: new Color("#3f4348"),
        envMapIntensity: 1.4,
        metalness: 0.76,
        roughness: 0.28,
      }),
    []
  )
  const seeds = useMemo(
    () =>
      Array.from({ length: cubeCount }, (_, index) => ({
        routeIndex: index % routes.length,
      })),
    []
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material]
  )

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return

    const elapsed = reduceMotion ? 3.4 : clock.getElapsedTime()
    const travel = reduceMotion
      ? 0
      : elapsed * 0.052 + Math.sin(elapsed * 0.42) * 0.012
    const width = viewport.width
    const height = viewport.height
    const activeCount =
      size.width < 640 ? 36 : size.width < 1024 ? 52 : cubeCount
    const cubesPerRoute = activeCount / routes.length

    seeds.forEach((seed, index) => {
      if (index >= activeCount) {
        dummy.scale.setScalar(0)
        dummy.updateMatrix()
        mesh.current?.setMatrixAt(index, dummy.matrix)
        return
      }

      const routeStep = Math.floor(index / routes.length)
      const phase =
        (routeStep / cubesPerRoute + seed.routeIndex / activeCount + travel) % 1
      const route = routes[seed.routeIndex]
      const isIncoming = phase < ingressPortion
      const progress = isIncoming
        ? phase / ingressPortion
        : (phase - ingressPortion) / (1 - ingressPortion)
      const start = isIncoming ? route.start : join
      const control = isIncoming ? route.control : exitControl
      const end = isIncoming ? join : exit
      const x = quadratic(start[0], control[0], end[0], progress) * width
      const y =
        quadratic(start[1], control[1], end[1], progress) * height +
        pointer.y * 0.05
      const z = quadratic(start[2], control[2], end[2], progress)
      const tangentX =
        quadraticTangent(start[0], control[0], end[0], progress) * width
      const tangentY =
        quadraticTangent(start[1], control[1], end[1], progress) * height
      const tangent = Math.atan2(tangentY, tangentX)
      const pathEnvelope = Math.sin(progress * Math.PI)
      const flowWave =
        Math.sin(phase * Math.PI * 3.2 - elapsed * 0.7) * pathEnvelope * 0.012
      const rotationDrift =
        Math.sin(elapsed * 0.34 + seed.routeIndex * 1.3) * 0.12

      dummy.position.set(
        x - Math.sin(tangent) * flowWave * height,
        y + Math.cos(tangent) * flowWave * height,
        z +
          Math.cos(phase * Math.PI * 2.4 - elapsed * 0.48) *
            pathEnvelope *
            0.035
      )
      dummy.rotation.set(
        elapsed * (0.09 + seed.routeIndex * 0.008) +
          phase * 0.8 +
          rotationDrift,
        elapsed * (0.14 + seed.routeIndex * 0.006) + phase * Math.PI * 0.85,
        tangent + rotationDrift * 0.2
      )
      const distanceScale = MathUtils.lerp(
        1.08,
        0.38,
        MathUtils.smoothstep(phase, 0.22, 1)
      )
      const perspectiveScale = distanceScale * (size.width < 640 ? 0.64 : 1)
      dummy.scale.setScalar(perspectiveScale)
      dummy.updateMatrix()
      matrix.copy(dummy.matrix)
      mesh.current?.setMatrixAt(index, matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, cubeCount]}
      frustumCulled={false}
    />
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
        camera={{ position: [0, 0, 6.8], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <StreamEnvironment />
        <ambientLight intensity={0.42} />
        <directionalLight
          color="#dce9ff"
          position={[-4, 5, 6]}
          intensity={4.8}
        />
        <directionalLight
          color="#ffe7d2"
          position={[5, -3, 4]}
          intensity={2.4}
        />
        <pointLight color="#c5d6ff" position={[1, 1, 4]} intensity={10} />
        <CubeFlow reduceMotion={reduceMotion} />
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={6.35}
            focusRange={0.28}
            bokehScale={2.4}
            resolutionScale={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export { LivepeerCubeStream }
