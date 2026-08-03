import { WaitlistPanel } from "@/components/livepeer-ui/waitlist-panel"

import { waitlistContentFixture } from "./waitlist-content-fixture"

export default function WaitlistPanelDemo() {
  return (
    <div className="flex w-full justify-end overflow-hidden rounded-2xl bg-black p-3">
      <WaitlistPanel content={waitlistContentFixture} />
    </div>
  )
}
