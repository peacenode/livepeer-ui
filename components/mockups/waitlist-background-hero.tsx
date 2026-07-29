import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"

export function WaitlistBackgroundHero() {
  return (
    <section className="@container absolute inset-0 isolate overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_42%,rgba(255,255,255,0.1)_0%,transparent_48%)] opacity-50 md:opacity-75" />
      <LivepeerCubeStream inverted className="opacity-90" />
    </section>
  )
}
