import { LivepeerGradientLockup } from "@/components/brand"
import { cn } from "@/lib/utils"

type SlideAlignment = "left" | "center" | "right"
type SlideFormat = "landscape" | "portrait"

const alignments: SlideAlignment[] = ["left", "center", "right"]

const formatConfig = {
  landscape: {
    width: 1920,
    height: 1080,
    insetX: 96,
    topY: 84,
    bottomY: 996,
    heroX: 96,
    heroY: 180,
    heroWidth: 1728,
    heroHeight: 720,
    heroTextWidth: 1500,
    heroFontSize: 132,
  },
  portrait: {
    width: 1080,
    height: 1920,
    insetX: 72,
    topY: 88,
    bottomY: 1832,
    heroX: 72,
    heroY: 280,
    heroWidth: 936,
    heroHeight: 1360,
    heroTextWidth: 840,
    heroFontSize: 116,
  },
} as const

const railFontSize = 22
const logoWidth = 144
const logoHeight = 18

function SlideRail({
  position,
  format,
}: {
  position: "top" | "bottom"
  format: SlideFormat
}) {
  const isTop = position === "top"
  const canvas = formatConfig[format]
  const y = isTop ? canvas.topY : canvas.bottomY

  return (
    <g
      fill="currentColor"
      fontFamily="var(--font-mono)"
      fontSize={railFontSize}
      letterSpacing={2}
    >
      {isTop ? (
        <LivepeerGradientLockup
          x={canvas.insetX}
          y={y - logoHeight / 2}
          width={logoWidth}
          height={logoHeight}
          className="text-white"
        />
      ) : (
        <text
          x={canvas.insetX}
          y={y}
          dominantBaseline="middle"
          textAnchor="start"
        >
          LIVEPEER.ORG
        </text>
      )}

      <text
        x={canvas.width / 2}
        y={y}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {isTop ? "Presentation" : "Foundations"}
      </text>

      <text
        x={canvas.width - canvas.insetX}
        y={y}
        dominantBaseline="middle"
        textAnchor="end"
      >
        {isTop ? "July 2026" : "01"}
      </text>
    </g>
  )
}

function SlideCanvas({
  format,
  alignment,
}: {
  format: SlideFormat
  alignment: SlideAlignment
}) {
  const canvas = formatConfig[format]

  const justifyContent = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  }[alignment]

  return (
    <svg
      viewBox={`0 0 ${canvas.width} ${canvas.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${format} Livepeer slide with ${alignment}-aligned hero text`}
      className="block h-auto w-full text-white"
    >
      <rect width={canvas.width} height={canvas.height} fill="#0a0a0a" />
      <SlideRail position="top" format={format} />

      <foreignObject
        x={canvas.heroX}
        y={canvas.heroY}
        width={canvas.heroWidth}
        height={canvas.heroHeight}
      >
        <div
          style={{
            alignItems: "center",
            color: "white",
            display: "flex",
            fontFamily: "var(--font-display)",
            fontSize: canvas.heroFontSize,
            fontWeight: 300,
            height: "100%",
            justifyContent,
            letterSpacing: "-0.055em",
            lineHeight: 0.94,
            textAlign: alignment,
            width: "100%",
          }}
        >
          <div style={{ width: canvas.heroTextWidth }}>
            A clear statement goes here.
          </div>
        </div>
      </foreignObject>

      <SlideRail position="bottom" format={format} />
    </svg>
  )
}

function SlideLayout({
  format,
  alignment,
}: {
  format: SlideFormat
  alignment: SlideAlignment
}) {
  return (
    <figure
      className={cn(
        format === "portrait" && "mx-auto w-full max-w-72"
      )}
    >
      <div className="overflow-hidden rounded-sm border border-neutral-800 bg-neutral-950 shadow-sm">
        <SlideCanvas format={format} alignment={alignment} />
      </div>
      <figcaption className="mt-2 text-sm text-muted-foreground capitalize">
        Hero {alignment}
      </figcaption>
    </figure>
  )
}

function SlideFormatSection({
  title,
  format,
}: {
  title: string
  format: SlideFormat
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div
        className={cn(
          "mt-4 grid gap-x-4 gap-y-6",
          format === "landscape"
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {alignments.map((alignment) => (
          <SlideLayout
            key={`${format}-${alignment}`}
            format={format}
            alignment={alignment}
          />
        ))}
      </div>
    </section>
  )
}

export function SlideLayouts() {
  return (
    <>
      <SlideFormatSection title="16:9" format="landscape" />
      <SlideFormatSection title="9:16" format="portrait" />
    </>
  )
}
