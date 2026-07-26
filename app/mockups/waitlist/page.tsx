import type { Metadata } from "next"

import { WaitlistMockup } from "./waitlist-mockup"

export const metadata: Metadata = {
  title: "Waitlist",
  description: "A simple referral waitlist mockup.",
}

export default function WaitlistPage() {
  return <WaitlistMockup />
}
