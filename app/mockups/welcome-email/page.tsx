import type { Metadata } from "next"

import { WelcomeEmail } from "@/components/mockups/welcome-email"

export const metadata: Metadata = {
  title: "Welcome Email",
  description: "Private beta welcome email for Livepeer Agent.",
}

export default function WelcomeEmailPage() {
  const content = {
    heading: "Welcome to the private beta.",
    paragraphs: [
      "You're in.",
      "Livepeer Agent brings image and video generation directly into Claude, so you can create without leaving your session.",
      "Your account includes limited free credits to help you run your first generation.",
    ],
    ctaLabel: "Add to Claude",
    ctaHref: "/mockups/agent-landing-page",
    signoff: "See you in Claude,",
    sender: "The Livepeer team",
  }

  return (
    <main className="flex min-h-svh justify-center bg-muted sm:px-6">
      <WelcomeEmail content={content} />
    </main>
  )
}
