import type { Metadata } from "next"

import { PlatformAuthGate } from "@/components/livepeer-ui/platform-auth-gate"
import { agentConsoleUserFixture } from "@/app/mockups/_data/agent-console-user"
import { PlatformSidebar } from "@/components/livepeer-ui/platform-sidebar"
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
  const navigation = shell.navigation.map((item) =>
    item._key === "learn"
      ? {
          ...item,
          label: "Playbooks",
          href: "/mockups/livepeer-agent/playbooks",
          external: false,
        }
      : item
  )

  return (
    <PlatformAuthGate
      authenticatedStorageKey="livepeer-agent-private-beta-authenticated"
      content={shell.auth}
    >
      <div className="fixed inset-0 flex overflow-hidden overscroll-none bg-background">
        <PlatformSidebar
          homeAriaLabel={shell.homeAriaLabel}
          navigation={navigation}
          userMenuContent={shell.userMenu}
          user={agentConsoleUserFixture}
        />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden overscroll-none">
          <div className="flex min-h-0 w-full flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
