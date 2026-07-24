"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group } from "three"

import { cn } from "@/lib/utils"

const blocks: [number, number, number][] = [
  [-1.2, 1.2, 0],
  [-1.2, 0, 0],
  [-1.2, -1.2, 0],
  [0, 0.6, 0],
  [0, -0.6, 0],
  [1.2, 0, 0],
]

function Symbol({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<Group>(null)

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reduceMotion) return

    const time = clock.getElapsedTime()
    const targetX = -0.52 + pointer.y * 0.1
    const targetY = -0.72 + pointer.x * 0.14 + Math.sin(time * 0.35) * 0.05
    const damping = Math.min(delta * 4, 1)

    group.current.rotation.x += (targetX - group.current.rotation.x) * damping
    group.current.rotation.y += (targetY - group.current.rotation.y) * damping
    group.current.position.y = Math.sin(time * 0.7) * 0.04
  })

  return (
    <group
      ref={group}
      position={[0.35, 0, 0]}
      rotation={[-0.52, -0.72, -0.16]}
      scale={1.35}
    >
      {blocks.map((position) => (
        <mesh key={position.join("-")} position={position}>
          <boxGeometry args={[0.66, 0.66, 0.48]} />
          <meshPhysicalMaterial
            clearcoat={0.75}
            clearcoatRoughness={0.16}
            color="#4a4a4a"
            metalness={0.82}
            roughness={0.22}
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
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={4.5} />
        <directionalLight position={[-4, -1, 2]} intensity={1.4} />
        <pointLight position={[0, -3, 3]} intensity={10} />
        <Symbol reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}

export { LivepeerSymbol3D }
