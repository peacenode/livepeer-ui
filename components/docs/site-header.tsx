import Link from "next/link"

import { LivepeerLockup, RegistryUiMark } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/docs/mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-4 px-4 md:px-8">
        <MobileNav />
        <Link
          href="/"
          aria-label="Livepeer UI home"
          className="flex items-center gap-2"
        >
          <LivepeerLockup className="h-3.5 w-auto" />
          <RegistryUiMark className="h-3.5 w-auto" aria-hidden="true" />
        </Link>
        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
