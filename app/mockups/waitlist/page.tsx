import type { Metadata } from "next"

import { WaitlistMockup } from "./waitlist-mockup"

export const metadata: Metadata = {
  title: "Livepeer Agent Waitlist",
  description: "Join the waitlist for early access to Livepeer Agent.",
}

export default function WaitlistPage() {
  return <WaitlistMockup />
}
