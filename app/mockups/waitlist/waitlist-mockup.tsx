import { WaitlistBackgroundHero } from "@/components/mockups/waitlist-background-hero"
import { WaitlistPanel } from "@/components/mockups/waitlist-panel"

export function WaitlistMockup() {
  return (
    <main className="relative flex min-h-svh justify-end overflow-hidden bg-black p-3 sm:p-4">
      <WaitlistPanel />
      <WaitlistBackgroundHero />
    </main>
  )
}
