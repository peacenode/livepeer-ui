"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const PREVIEW_WIDTH = 1440
const PREVIEW_HEIGHT = 810

export function ScaledComponentPreview({
  path,
  title,
  className,
}: {
  path: string
  title: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      setScale(container.clientWidth / PREVIEW_WIDTH)
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border bg-background",
        className
      )}
    >
      <iframe
        src={path}
        title={`${title} preview`}
        className="absolute top-0 left-0 border-0 bg-background"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  )
}
