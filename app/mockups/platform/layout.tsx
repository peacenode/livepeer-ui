import type { Metadata } from "next"

import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { PlatformMobileNav } from "@/components/mockups/platform-mobile-nav"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s - Livepeer Console",
  },
}

export default function MockupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PlatformAuthGate>
      <div className="relative flex h-dvh overflow-hidden bg-background">
        <PlatformSidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 pt-4 md:hidden">
            <Link
              href="/mockups/platform"
              aria-label="Livepeer home"
              className="inline-flex"
            >
              <span className="flex items-center gap-1.5 text-black">
                <LivepeerGradientSymbol className="h-4 w-auto" />
                <LivepeerWordmark className="h-4 w-auto" />
              </span>
            </Link>
            <PlatformMobileNav />
          </div>
          <div className="mx-auto flex min-h-0 w-full max-w-screen-2xl flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
