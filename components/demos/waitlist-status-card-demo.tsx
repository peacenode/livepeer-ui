import { WaitlistStatusCard } from "@/components/livepeer-ui/waitlist-status-card"

import { waitlistContentFixture } from "@/app/mockups/_data/waitlist-content"

export default function WaitlistStatusCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <WaitlistStatusCard {...waitlistContentFixture.statusCard} />
    </div>
  )
}
