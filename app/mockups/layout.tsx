import type { Metadata } from "next"

import Link from "next/link"

import { LivepeerLockup } from "@/components/brand"
import { GlobalSearch } from "@/components/mockups/global-search"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Platform",
    template: "%s - Livepeer Platform",
  },
}

export default function MockupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-dvh bg-background">
      <PlatformSidebar />
      <main className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4 px-6 pt-4 md:px-10">
          <Link
            href="/mockups"
            aria-label="Livepeer home"
            className="inline-flex md:hidden"
          >
            <LivepeerLockup className="h-3.5 w-auto" />
          </Link>
          <div className="flex w-full max-w-xs justify-end md:pointer-events-none md:absolute md:inset-x-0 md:top-4 md:max-w-none md:justify-center">
            <div className="w-full max-w-xs md:pointer-events-auto">
              <GlobalSearch />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
