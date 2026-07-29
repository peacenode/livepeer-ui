import { WaitlistBackgroundHero } from "@/components/mockups/waitlist-background-hero"
import { WaitlistPanel } from "@/components/mockups/waitlist-panel"
import type { WaitlistPageContent } from "@/components/mockups/contracts"

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
