import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export interface WaitlistPageContent {
  _id: string
  metadata: {
    title: string
    description: string
  }
  backgroundHero: {
    brandAriaLabel: string
    agentLabel: string
  }
  panel: {
    brandAriaLabel: string
    agentLabel: string
    heading: string
    description: string
    joinedToast: string
    referralPrompt: string
  }
  signupForm: {
    label: string
    emailPlaceholder: string
    submitAriaLabel: string
  }
  statusCard: {
    positionLabel: string
    referralsLabel: string
  }
  referralLink: {
    copyAriaLabel: string
    copiedToast: string
  }
  leaderboard: {
    heading: string
    personColumnLabel: string
    referralsColumnLabel: string
    currentUserLabel: string
  }
}

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
