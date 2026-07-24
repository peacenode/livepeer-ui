import type { Metadata } from "next"
import Link from "next/link"

import { LivepeerLockup, LivepeerSymbol } from "@/components/brand"
import { SiteFooter } from "@/components/site-footer"

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
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6">
          <Link
            href="/mockups/playbooks"
            className="flex items-center gap-3"
            aria-label="Playbooks home"
          >
            <LivepeerSymbol className="h-5 w-auto sm:hidden" />
            <LivepeerLockup className="hidden h-4 w-auto sm:block" />
          </Link>
          <PlaybooksNav />
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
