import type { Metadata } from "next"
import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { SiteFooter } from "@/components/site-footer"

import { LandingMenu } from "./landing-menu"

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
        <div className="flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
          <Link
            href="/mockups/livepeer-org"
            className="flex shrink-0 items-center gap-3"
            aria-label="Landing home"
          >
            <span className="flex items-center gap-1.5 text-black">
              <LivepeerGradientSymbol className="h-3.5 w-auto sm:h-4" />
              <LivepeerWordmark className="h-3.5 w-auto sm:h-4" />
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <LandingMenu />
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
