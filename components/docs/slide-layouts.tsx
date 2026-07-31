import { LivepeerGradientLockup } from "@/components/brand"
import { cn } from "@/lib/utils"

type SlideAlignment = "left" | "center" | "right"
type SlideFormat = "landscape" | "portrait"

const alignments: SlideAlignment[] = ["left", "center", "right"]

function SlideRail({
  position,
  format,
}: {
  position: "top" | "bottom"
  format: SlideFormat
}) {
  const isTop = position === "top"

  return (
    <div
      className={cn(
        "absolute grid grid-cols-3 items-center gap-2 font-mono leading-none tracking-wide uppercase",
        format === "landscape"
          ? "inset-x-[5%] text-[clamp(0.35rem,0.65vw,0.625rem)]"
          : "inset-x-[8%] text-[clamp(0.35rem,0.75vw,0.625rem)]",
        isTop
          ? format === "landscape"
            ? "top-[8%]"
            : "top-[5%]"
          : format === "landscape"
            ? "bottom-[8%]"
            : "bottom-[5%]"
      )}
    >
      {isTop ? (
        <LivepeerGradientLockup className="h-[clamp(0.45rem,0.9vw,0.75rem)] w-auto max-w-full text-white" />
      ) : (
        <span className="truncate text-left">livepeer.org</span>
      )}
      <span className="truncate text-center">
        {isTop ? "Presentation" : "Foundations"}
      </span>
      <span className="truncate text-right">
        {isTop ? "July 2026" : "01"}
      </span>
    </div>
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
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 text-white shadow-sm",
          format === "landscape" ? "aspect-video" : "aspect-[9/16]"
        )}
      >
        <SlideRail position="top" format={format} />

        <div
          className={cn(
            "absolute flex items-center",
            format === "landscape"
              ? "inset-x-[5%] inset-y-[19%]"
              : "inset-x-[8%] inset-y-[16%]",
            alignment === "left" && "justify-start",
            alignment === "center" && "justify-center",
            alignment === "right" && "justify-end"
          )}
        >
          <p
            className={cn(
              "max-w-[90%] font-display leading-[0.94] font-light tracking-[-0.055em] text-balance",
              format === "landscape"
                ? "text-[clamp(1.125rem,1.8vw,1.5rem)]"
                : "text-[clamp(1.5rem,3.5vw,2.75rem)]",
              alignment === "left" && "text-left",
              alignment === "center" && "text-center",
              alignment === "right" && "text-right"
            )}
          >
            A clear statement goes here.
          </p>
        </div>

        <SlideRail position="bottom" format={format} />
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
