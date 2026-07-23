import type { Metadata } from "next"

import Link from "next/link"

import { LivepeerLockup } from "@/components/brand"
import { PlatformMobileNav } from "@/components/mockups/platform-mobile-nav"
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
        <div className="flex items-center gap-3 px-4 pt-4 md:hidden">
          <PlatformMobileNav />
          <Link href="/mockups" aria-label="Livepeer home" className="inline-flex">
            <LivepeerLockup className="h-4 w-auto" />
          </Link>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
