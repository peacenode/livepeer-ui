import type { Metadata } from "next"
import Link from "next/link"

import { LivepeerLockup } from "@/components/brand"

export const metadata: Metadata = {
  title: {
    default: "Playbooks",
    template: "%s - Playbooks",
  },
}

export default function PlaybooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href="/mockups/playbooks"
            className="flex items-center gap-3"
            aria-label="Playbooks home"
          >
            <LivepeerLockup className="h-4 w-auto" />
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="text-sm font-medium">Playbooks</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/mockups/playbooks"
              className="rounded-md bg-muted px-3 py-2 font-medium"
            >
              Discover
            </Link>
            <Link
              href="/mockups/platform/workflows"
              className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
            >
              Workflows
            </Link>
            <Link
              href="/mockups/platform/runner"
              className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
            >
              Runner
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
