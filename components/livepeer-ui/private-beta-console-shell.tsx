import type { AgentConsoleUser } from "@/components/livepeer-ui/contracts"
import { PlatformAuthGate } from "@/components/livepeer-ui/platform-auth-gate"
import { PlatformSidebar } from "@/components/livepeer-ui/platform-sidebar"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

const consoleHref = "/mockups/private-beta/landing/console"

export async function PrivateBetaConsoleShell({
  children,
  user,
}: Readonly<{
  children: React.ReactNode
  user: AgentConsoleUser
}>) {
  const shell = await getAgentConsoleShell()

  if (!shell) {
    throw new Error(
      'Required Sanity document "agentConsoleShell" is missing or incomplete.'
    )
  }

  const releaseCycleHrefs: Record<string, { href: string; label?: string }> = {
    home: { href: consoleHref },
    usage: { href: `${consoleHref}/usage` },
    "api-keys": { href: `${consoleHref}/api` },
    "api-logs": { href: `${consoleHref}/api-logs` },
    learn: { href: `${consoleHref}/playbooks`, label: "Playbooks" },
  }
  const navigation = shell.navigation.map((item) => ({
    ...item,
    ...(item._key ? (releaseCycleHrefs[item._key] ?? {}) : {}),
    external: false,
  }))

  return (
    <PlatformAuthGate
      authenticatedStorageKey="livepeer-agent-private-beta-authenticated"
      content={shell.auth}
      googleLabel="Sign in with Google"
      showDescription={false}
      showDiscord={false}
      title="Sign in for early access"
    >
      <div className="relative isolate flex h-dvh min-h-0 overflow-hidden bg-background">
        <PlatformSidebar
          className="min-h-0 overscroll-contain"
          homeAriaLabel={shell.homeAriaLabel}
          navigation={navigation}
          userMenuContent={shell.userMenu}
          user={user}
          homeHref={consoleHref}
          profileHref={`${consoleHref}/account`}
        />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 w-full flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
