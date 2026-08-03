import { WaitlistBackgroundHero } from "@/components/livepeer-ui/waitlist-background-hero"
import { WaitlistPanel } from "@/components/livepeer-ui/waitlist-panel"
import type { WaitlistPageContent } from "@/components/livepeer-ui/contracts"

export function WaitlistMockup({ content }: { content: WaitlistPageContent }) {
  return (
    <main className="relative h-svh overflow-hidden overscroll-none bg-black p-3 sm:p-4">
      <WaitlistBackgroundHero />
      <div className="relative z-10 flex h-full min-h-0">
        <WaitlistPanel content={content} />
      </div>
    </main>
  )
}
