"use client"

import * as React from "react"

function toHex(cssColor: string): string {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d")
  if (!ctx) return cssColor
  ctx.fillStyle = cssColor
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return (
    "#" +
    [r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")
  )
}

function Swatch({ step, className }: { step: string; className: string }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [hex, setHex] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (ref.current) {
      setHex(toHex(getComputedStyle(ref.current).backgroundColor))
    }
  }, [])

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <button
        ref={ref}
        type="button"
        aria-label={`Copy ${hex || step}`}
        onClick={async () => {
          await navigator.clipboard.writeText(hex)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        }}
        className={`h-14 w-full cursor-pointer rounded-md border border-border/50 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${className}`}
      />
      <span className="font-mono text-[11px] leading-none">{step}</span>
      <span className="truncate font-mono text-[10px] leading-none text-muted-foreground">
        {copied ? "copied" : hex}
      </span>
    </div>
  )
}

export function ColorScale({
  name,
  note,
  swatches,
}: {
  name: string
  note: string
  swatches: { step: string; className: string }[]
}) {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11 lg:gap-2">
        {swatches.map((swatch) => (
          <Swatch key={swatch.step} step={swatch.step} className={swatch.className} />
        ))}
      </div>
    </section>
  )
}
