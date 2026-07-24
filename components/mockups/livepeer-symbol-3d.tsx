"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PMREMGenerator, type Group } from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

import { cn } from "@/lib/utils"

const blocks: [number, number, number][] = [
  [-1.2, 1.2, 0],
  [-1.2, 0, 0],
  [-1.2, -1.2, 0],
  [0, 0.6, 0],
  [0, -0.6, 0],
  [1.2, 0, 0],
]

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

function Symbol({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<Group>(null)
  const geometry = useMemo(
    () => new RoundedBoxGeometry(0.66, 0.66, 0.48, 5, 0.075),
    []
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reduceMotion) return

    const time = clock.getElapsedTime()
    const targetX = -0.52 + pointer.y * 0.1
    const targetY = 0.72 + pointer.x * 0.14 + Math.sin(time * 0.35) * 0.05
    const damping = Math.min(delta * 4, 1)

    group.current.rotation.x += (targetX - group.current.rotation.x) * damping
    group.current.rotation.y += (targetY - group.current.rotation.y) * damping
    group.current.position.y = Math.sin(time * 0.7) * 0.04
  })

  return (
    <group
      ref={group}
      position={[-0.35, 0, 0]}
      rotation={[-0.52, 0.72, 0.16]}
      scale={1.35}
    >
      {blocks.map((position) => (
        <mesh geometry={geometry} key={position.join("-")} position={position}>
          <meshPhysicalMaterial
            anisotropy={0.45}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            color="#50545a"
            envMapIntensity={1.6}
            iridescence={0.18}
            iridescenceIOR={1.45}
            iridescenceThicknessRange={[180, 420]}
            metalness={0.82}
            roughness={0.24}
          />
        </mesh>
      ))}
    </group>
  )
}

function LivepeerSymbol3D({ className }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)

    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  return (
    <div
      className={cn(
        "min-h-52 overflow-hidden rounded-b-xl md:min-h-full md:rounded-r-xl md:rounded-bl-none",
        className
      )}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <StudioEnvironment />
        <ambientLight intensity={0.3} />
        <directionalLight
          color="#dce9ff"
          position={[-4, 5, 5]}
          intensity={5.2}
        />
        <directionalLight
          color="#ffe2c8"
          position={[4, -2, 3]}
          intensity={2.2}
        />
        <pointLight color="#c4d7ff" position={[-2, -3, 3]} intensity={12} />
        <Symbol reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}

export { LivepeerSymbol3D }
