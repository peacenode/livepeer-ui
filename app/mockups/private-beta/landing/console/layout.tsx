import type { Metadata } from "next"

import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { agentConsoleUserFixture } from "@/components/mockups/fixtures/agent-console-user"
import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

const consoleHref = "/mockups/private-beta/landing/console"

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
  const shell = (await getAgentConsoleShell()) ?? agentConsoleShellFixture

  const navigation = shell.navigation.map((item) => {
    if (item._key === "learn" || item.label === "Learn") {
      return {
        ...item,
        label: "Playbooks",
        href: `${consoleHref}/playbooks`,
        external: false,
      }
    }

    if (item.label === "Home") {
      return { ...item, href: consoleHref, external: false }
    }

    return item
  })

  return (
    <PlatformAuthGate content={shell.auth}>
      <div className="relative flex h-dvh overflow-hidden bg-background">
        <PlatformSidebar
          homeAriaLabel={shell.homeAriaLabel}
          navigation={navigation}
          userMenuContent={shell.userMenu}
          user={agentConsoleUserFixture}
          homeHref={consoleHref}
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
