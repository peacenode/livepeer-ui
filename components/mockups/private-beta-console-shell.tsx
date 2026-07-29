import { agentConsoleUserFixture } from "@/components/mockups/fixtures/agent-console-user"
import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

const consoleHref = "/mockups/private-beta/landing/console"

export async function PrivateBetaConsoleShell({
  children,
}: Readonly<{
  children: React.ReactNode
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
    ...(item._key ? releaseCycleHrefs[item._key] ?? {} : {}),
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
      <div className="relative isolate flex h-dvh min-h-0 overflow-hidden overscroll-none bg-background">
        <PlatformSidebar
          className="min-h-0 overscroll-contain"
          homeAriaLabel={shell.homeAriaLabel}
          navigation={navigation}
          userMenuContent={shell.userMenu}
          user={agentConsoleUserFixture}
          homeHref={consoleHref}
          profileHref={`${consoleHref}/account`}
        />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden overscroll-none">
          <div className="mx-auto flex min-h-0 w-full max-w-screen-2xl flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
