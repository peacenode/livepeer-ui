import { WaitlistReferralLink } from "@/components/mockups/waitlist-referral-link"

export default function WaitlistReferralLinkDemo() {
  return (
    <div className="dark w-full max-w-sm rounded-xl bg-black p-6 text-foreground">
      <WaitlistReferralLink inviteUrl="livepeer.org/agent/invite" />
    </div>
  )
}
