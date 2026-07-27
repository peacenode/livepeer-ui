import { WaitlistBackgroundHero } from "@/components/mockups/waitlist-background-hero"
import { WaitlistPanel } from "@/components/mockups/waitlist-panel"
import type { WaitlistPageContent } from "@/components/mockups/contracts"

export function WaitlistMockup({ content }: { content: WaitlistPageContent }) {
  return (
    <main className="relative flex min-h-svh justify-end overflow-hidden bg-black p-3 sm:p-4">
      <WaitlistPanel content={content} />
      <WaitlistBackgroundHero {...content.backgroundHero} />
    </main>
  )
}
