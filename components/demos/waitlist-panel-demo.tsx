import { WaitlistPanel } from "@/components/livepeer-ui/waitlist-panel"

import { waitlistContentFixture } from "@/app/mockups/_data/waitlist-content"

export default function WaitlistPanelDemo() {
  return (
    <div className="flex w-full justify-end overflow-hidden rounded-sm bg-black p-3">
      <WaitlistPanel content={waitlistContentFixture} />
    </div>
  )
}
