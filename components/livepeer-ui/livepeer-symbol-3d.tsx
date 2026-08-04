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

function CanvasResizer() {
  const { gl, setSize } = useThree()

  useEffect(() => {
    const container = gl.domElement.parentElement
    if (!container) return

    const resize = () => {
      const bounds = container.getBoundingClientRect()
      if (bounds.width > 0 && bounds.height > 0) {
        setSize(bounds.width, bounds.height)
        gl.setSize(bounds.width, bounds.height, true)
      }
    }
    const observer = new ResizeObserver(resize)

    observer.observe(container)
    resize()

    return () => observer.disconnect()
  }, [gl, setSize])

  return null
}

function Symbol({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<Group>(null)
  const { size, viewport } = useThree()
  const isWide = size.width >= 640
  const geometry = useMemo(
    () => new RoundedBoxGeometry(0.66, 0.66, 0.48, 4, 0.015),
    []
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reduceMotion) return

    const time = clock.getElapsedTime()
    const targetX = -0.22 + pointer.y * 0.07
    const targetY = 0.32 + pointer.x * 0.1 + Math.sin(time * 0.35) * 0.035
    const damping = Math.min(delta * 4, 1)

    group.current.rotation.x += (targetX - group.current.rotation.x) * damping
    group.current.rotation.y += (targetY - group.current.rotation.y) * damping
    group.current.position.y = Math.sin(time * 0.7) * 0.04
  })

  return (
    <group
      ref={group}
      position={[
        isWide ? viewport.width * 0.14 : -viewport.width * 0.02,
        isWide ? 0 : -0.16,
        0,
      ]}
      rotation={[-0.22, 0.32, 0.04]}
      scale={isWide ? 1.55 : 1.15}
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

function LivepeerSymbol3D({
  className,
  showOnMobile = false,
}: {
  className?: string
  showOnMobile?: boolean
}) {
  const [reduceMotion, setReduceMotion] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const updatePreferences = () => {
      setReduceMotion(motionQuery.matches)
      setIsDesktop(desktopQuery.matches)
    }

    updatePreferences()
    motionQuery.addEventListener("change", updatePreferences)
    desktopQuery.addEventListener("change", updatePreferences)

    return () => {
      motionQuery.removeEventListener("change", updatePreferences)
      desktopQuery.removeEventListener("change", updatePreferences)
    }
  }, [])

  if (!isDesktop && !showOnMobile) return null

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-sm [&_canvas]:!size-full",
        className
      )}
      aria-hidden="true"
    >
      <Canvas
        className="size-full"
        camera={{ position: [0, 0, 5.3], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <CanvasResizer />
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
