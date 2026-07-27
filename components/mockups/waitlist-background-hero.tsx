import { LivepeerGradientLockup } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"

export function WaitlistBackgroundHero() {
  return (
    <section className="@container absolute inset-0 isolate overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(255,255,255,0.1)_0%,transparent_48%)]" />
      <LivepeerCubeStream inverted className="opacity-90" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-6 sm:px-10 md:pr-[27rem]">
        <h2
          className="flex w-full items-end justify-center gap-[clamp(0.75rem,1.6cqw,2rem)] text-white/90"
          aria-label="Livepeer Agent"
        >
          <LivepeerGradientLockup
            className="h-[clamp(2rem,4.5cqw,4.5rem)] w-auto"
            aria-hidden="true"
          />
          <span
            className="translate-y-[0.08em] font-agent text-[clamp(1.625rem,3.6cqw,3.625rem)] leading-none font-medium tracking-[-0.045em]"
            aria-hidden="true"
          >
            AGENT
          </span>
        </h2>
      </div>
    </section>
  )
}
