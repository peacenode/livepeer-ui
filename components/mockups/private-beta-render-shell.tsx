import { PlatformBrandLink } from "@/components/mockups/platform-brand-link"
import { getAgentConsoleShell } from "@/sanity/lib/agent-console-pages"

const consoleHref = "/mockups/private-beta/landing/console"

export async function PrivateBetaRenderShell({
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

  return (
    <div className="relative isolate flex h-dvh min-h-0 flex-col overflow-hidden overscroll-none bg-background md:flex-row">
      <header className="flex h-16 shrink-0 items-center px-4 sm:px-6 md:hidden">
        <PlatformBrandLink
          ariaLabel={shell.homeAriaLabel}
          href={consoleHref}
        />
      </header>
      <aside className="hidden h-full w-64 shrink-0 bg-background md:block">
        <div className="px-5 pt-6 pb-1">
          <PlatformBrandLink
            ariaLabel={shell.homeAriaLabel}
            href={consoleHref}
          />
        </div>
      </aside>
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden overscroll-none">
        <div className="flex min-h-0 w-full flex-1 flex-col px-4 sm:px-6 md:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
