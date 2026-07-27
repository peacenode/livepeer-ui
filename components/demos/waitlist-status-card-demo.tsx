import { WaitlistStatusCard } from "@/components/mockups/waitlist-status-card"

import { waitlistContentFixture } from "./waitlist-content-fixture"

export default function WaitlistStatusCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <WaitlistStatusCard {...waitlistContentFixture.statusCard} />
    </div>
  )
}
