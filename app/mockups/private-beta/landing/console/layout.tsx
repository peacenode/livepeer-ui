import type { Metadata } from "next"

import { agentConsoleUserFixture } from "@/app/mockups/_data/agent-console-user"
import { PrivateBetaConsoleShell } from "@/components/livepeer-ui/private-beta-console-shell"

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s - Livepeer Agent Private Beta",
  },
}

export default async function PrivateBetaConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PrivateBetaConsoleShell user={agentConsoleUserFixture}>
      {children}
    </PrivateBetaConsoleShell>
  )
}
