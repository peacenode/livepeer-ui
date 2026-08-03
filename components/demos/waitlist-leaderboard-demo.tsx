import {
  WaitlistLeaderboard,
  type WaitlistLeader,
} from "@/components/livepeer-ui/waitlist-leaderboard"

import { waitlistContentFixture } from "./waitlist-content-fixture"

const leaders: WaitlistLeader[] = [
  { name: "Maya Chen", referrals: 142 },
  { name: "Owen Chen", referrals: 137 },
  { name: "Priya Chen", referrals: 132 },
  { name: "Noah Chen", referrals: 127 },
]

export default function WaitlistLeaderboardDemo() {
  return (
    <div className="dark w-full max-w-sm rounded-xl bg-black p-6 text-foreground">
      <WaitlistLeaderboard
        {...waitlistContentFixture.leaderboard}
        leaders={leaders}
      />
    </div>
  )
}
