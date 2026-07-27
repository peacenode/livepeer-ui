import type { WaitlistPageContent } from "@/sanity/lib/waitlist-content"

export const waitlistContentFixture = {
  _id: "waitlistPageContent-waitlist",
  metadata: {
    title: "Agent Waitlist",
    description: "Join the Agent Waitlist for early access to Livepeer Agent.",
  },
  backgroundHero: {
    brandAriaLabel: "Livepeer Agent",
    agentLabel: "AGENT",
  },
  panel: {
    brandAriaLabel: "Livepeer Agent",
    agentLabel: "AGENT",
    heading: "The Open Video Agent",
    description:
      "Livepeer agent is a harness for multimodal media generation, from right within Claude. Running on Livepeer's open network.",
    joinedToast: "You’re on the Livepeer Agent waitlist",
    referralPrompt: "Climb the leaderboard by referring friends.",
  },
  signupForm: {
    label: "Get early access",
    emailPlaceholder: "you@example.com",
    submitAriaLabel: "Join the waitlist",
  },
  statusCard: {
    positionLabel: "Waitlist position",
    referralsLabel: "Referrals",
  },
  referralLink: {
    copyAriaLabel: "Copy referral link",
    copiedToast: "Invite link copied",
  },
  leaderboard: {
    heading: "Leaderboard",
    personColumnLabel: "Person",
    referralsColumnLabel: "Referrals",
    currentUserLabel: "You",
  },
} satisfies WaitlistPageContent

export const waitlistContentSeedDocument = {
  ...waitlistContentFixture,
  _type: "waitlistPageContent" as const,
}
