import type { Metadata } from "next"
import Link from "next/link"

import { LivepeerLockup } from "@/components/brand"

import { PlaybooksNav } from "./playbooks-nav"

export const metadata: Metadata = {
  title: {
    default: "Livepeer",
    template: "%s - Livepeer",
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
          </Link>
          <PlaybooksNav />
        </div>
      </header>
      {children}
    </div>
  )
}
