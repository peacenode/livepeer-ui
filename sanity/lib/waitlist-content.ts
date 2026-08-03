import { defineQuery } from "next-sanity"

import type { WaitlistPageContent } from "@/components/livepeer-ui/contracts"
import { sanityClient } from "@/sanity/lib/client"

export type { WaitlistPageContent } from "@/components/livepeer-ui/contracts"

const waitlistPageContentQuery = defineQuery(`
  *[_type == "waitlistPageContent" && _id == "waitlistPageContent-waitlist"][0] {
    _id,
    metadata { title, description },
    backgroundHero { brandAriaLabel, agentLabel },
    panel {
      brandAriaLabel,
      agentLabel,
      heading,
      description,
      joinedToast,
      referralPrompt
    },
    signupForm { label, emailPlaceholder, submitAriaLabel },
    statusCard { positionLabel, referralsLabel },
    referralLink { copyAriaLabel, copiedToast },
    leaderboard {
      heading,
      personColumnLabel,
      referralsColumnLabel,
      currentUserLabel
    }
  }
`)

export function getWaitlistPageContent() {
  return sanityClient.fetch<WaitlistPageContent | null>(
    waitlistPageContentQuery,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["waitlist-page-content"],
      },
    }
  )
}
