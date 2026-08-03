import { WaitlistReferralLink } from "@/components/livepeer-ui/waitlist-referral-link"

import { waitlistContentFixture } from "./waitlist-content-fixture"

export default function WaitlistReferralLinkDemo() {
  return (
    <div className="dark w-full max-w-sm rounded-xl bg-black p-6 text-foreground">
      <WaitlistReferralLink
        {...waitlistContentFixture.referralLink}
        inviteUrl="livepeer.org/agent/invite"
      />
    </div>
  )
}
