import type { Metadata } from "next"

import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Agent - Livepeer Private Beta",
}

export default async function PrivateBetaAgentPage() {
  const shell = await getAgentConsoleShell()

  if (!shell) {
    throw new Error(
      'Required Sanity document "agentConsoleShell" is missing or incomplete.'
    )
  }

  return (
    <PlatformAuthGate
      authenticatedStorageKey="livepeer-agent-private-beta-authenticated"
      content={shell.auth}
      googleLabel="Sign in with Google"
      showDescription={false}
      showDiscord={false}
      successHref="/mockups/private-beta/landing/console"
      title="Sign in for early access"
      waitlistHref="/mockups/private-beta/earlyaccess"
      waitlistLabel="Sign up for the waitlist"
    >
      <main className="min-h-dvh bg-background" />
    </PlatformAuthGate>
  )
}
