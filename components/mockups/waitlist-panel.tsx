"use client"

import { useState } from "react"
import { toast } from "sonner"

import { LivepeerGradientLockup } from "@/components/brand"
import { WaitlistLeaderboard } from "@/components/mockups/waitlist-leaderboard"
import { WaitlistReferralLink } from "@/components/mockups/waitlist-referral-link"
import { WaitlistSignupForm } from "@/components/mockups/waitlist-signup-form"
import { WaitlistStatusCard } from "@/components/mockups/waitlist-status-card"
import type { WaitlistPageContent } from "@/components/mockups/contracts"

const firstNames = [
  "Maya",
  "Owen",
  "Priya",
  "Noah",
  "Avery",
  "Theo",
  "Sofia",
  "Eli",
  "Nia",
  "Leo",
]
const lastNames = [
  "Chen",
  "Park",
  "Shah",
  "Williams",
  "Kim",
  "Martinez",
  "Okafor",
  "Nguyen",
  "Patel",
  "Rivera",
]

export const waitlistLeaders = Array.from({ length: 100 }, (_, index) => ({
  name: `${firstNames[index % firstNames.length]} ${
    lastNames[Math.floor(index / firstNames.length) % lastNames.length]
  }`,
  referrals: Math.max(3, Math.round(142 * Math.pow(0.965, index))),
}))

export function WaitlistPanel({
  content,
  joinedInitially = false,
}: {
  content: Pick<
    WaitlistPageContent,
    "panel" | "signupForm" | "statusCard" | "referralLink" | "leaderboard"
  >
  joinedInitially?: boolean
}) {
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(joinedInitially)
  const inviteId = email.split("@")[0].replace(/[^a-z0-9]/gi, "") || "invite"
  const inviteUrl = `livepeer.org/agent/${inviteId.toLowerCase()}`

  function joinWaitlist(nextEmail: string) {
    setEmail(nextEmail)
    setJoined(true)
    toast.success(content.panel.joinedToast)
  }

  return (
    <aside className="dark relative z-10 flex min-h-[calc(100svh-1.5rem)] w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-white/20 bg-white/[0.055] px-6 py-6 text-foreground shadow-2xl shadow-black/30 backdrop-blur-md backdrop-saturate-150 sm:min-h-[calc(100svh-2rem)] sm:px-8 sm:py-8 md:h-[calc(100svh-2rem)] md:min-h-0">
      <div
        className="flex items-end gap-2 self-start text-white"
        aria-label={content.panel.brandAriaLabel}
      >
        <LivepeerGradientLockup className="h-4 w-auto" aria-hidden="true" />
        <span
          className="translate-y-[0.08em] font-agent text-base leading-none font-medium tracking-[-0.04em]"
          aria-hidden="true"
        >
          {content.panel.agentLabel}
        </span>
      </div>

      <div
        className={
          joined
            ? "mt-10 max-w-full sm:mt-12"
            : "mt-16 max-w-full sm:mt-24 md:mt-28"
        }
      >
        <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.98] font-light tracking-[-0.045em] text-balance">
          {content.panel.heading}
        </h1>
        <p className="mt-6 text-sm leading-6 text-pretty text-muted-foreground">
          {content.panel.description}
        </p>
      </div>

      <div className={joined ? "pt-10" : "mt-auto pt-14"}>
        {!joined ? (
          <WaitlistSignupForm {...content.signupForm} onJoin={joinWaitlist} />
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <WaitlistStatusCard {...content.statusCard} />
              <WaitlistReferralLink
                {...content.referralLink}
                inviteUrl={inviteUrl}
              />
            </div>
            <p className="py-4 text-center font-display text-lg leading-snug text-balance text-muted-foreground">
              {content.panel.referralPrompt}
            </p>
            <WaitlistLeaderboard
              {...content.leaderboard}
              leaders={waitlistLeaders}
            />
          </div>
        )}
      </div>
    </aside>
  )
}
