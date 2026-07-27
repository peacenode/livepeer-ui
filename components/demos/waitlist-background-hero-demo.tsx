import { WaitlistBackgroundHero } from "@/components/mockups/waitlist-background-hero"

import { waitlistContentFixture } from "./waitlist-content-fixture"

export default function WaitlistBackgroundHeroDemo() {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <WaitlistBackgroundHero {...waitlistContentFixture.backgroundHero} />
    </div>
  )
}
