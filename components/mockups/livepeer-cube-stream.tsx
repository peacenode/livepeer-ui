"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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

const cubeCount = 96
const laneOffsets = [-1.45, -0.88, -0.32, 0.32, 0.88, 1.45]

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
    () => new RoundedBoxGeometry(0.18, 0.18, 0.18, 3, 0.018),
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
        phase: index / cubeCount,
        lane: laneOffsets[index % laneOffsets.length],
        depth: ((index * 7) % 11) / 10 - 0.5,
        wobble: ((index * 13) % 17) / 17,
        scale: 0.72 + ((index * 5) % 9) / 20,
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
    const travel = reduceMotion ? 0 : elapsed * 0.055
    const width = viewport.width
    const height = viewport.height
    const depthScale = size.width < 768 ? 0.45 : 0.72

    seeds.forEach((seed, index) => {
      const phase = (seed.phase + travel) % 1
      const x = width * (-0.74 + phase * 1.48)
      const parabola = height * (-0.4 + 0.94 * phase * phase)
      const convergence = 1 - MathUtils.smoothstep(phase, 0.04, 0.46)
      const laneY = seed.lane * convergence * Math.min(height * 0.2, 1.18)
      const ripple =
        Math.sin(elapsed * 0.7 + seed.wobble * Math.PI * 2) *
        0.035 *
        convergence

      dummy.position.set(
        x,
        parabola + laneY + ripple + pointer.y * 0.05,
        seed.depth * convergence * depthScale
      )
      dummy.rotation.set(
        elapsed * 0.16 + seed.wobble,
        elapsed * 0.22 + phase * Math.PI,
        (phase - 0.5) * 0.42
      )
      const perspectiveScale =
        seed.scale * (0.8 + convergence * 0.28) * (size.width < 640 ? 0.82 : 1)
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
      </Canvas>
    </div>
  )
}

export { LivepeerCubeStream }
