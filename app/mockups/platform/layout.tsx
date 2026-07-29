import type { Metadata } from "next"

import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { agentConsoleUserFixture } from "@/components/mockups/fixtures/agent-console-user"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s - Livepeer Console",
  },
}

export default async function MockupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const shell = await getAgentConsoleShell()

  if (!shell) {
    throw new Error(
      "Required Sanity document agentConsoleShell is missing or incomplete."
    )
  }

  return (
    <PlatformAuthGate
      authenticatedStorageKey="livepeer-agent-private-beta-authenticated"
      content={shell.auth}
    >
      <div className="relative flex h-dvh overflow-hidden bg-background">
        <PlatformSidebar
          homeAriaLabel={shell.homeAriaLabel}
          navigation={shell.navigation}
          userMenuContent={shell.userMenu}
          user={agentConsoleUserFixture}
        />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mx-auto flex min-h-0 w-full max-w-screen-2xl flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
