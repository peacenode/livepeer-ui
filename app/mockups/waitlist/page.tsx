import type { Metadata } from "next"

import { WaitlistMockup } from "./waitlist-mockup"

export const metadata: Metadata = {
  title: "Agent Waitlist",
  description: "Join the Agent Waitlist for early access to Livepeer Agent.",
}

export default function WaitlistPage() {
  return <WaitlistMockup />
}
