import Link from "next/link"

import { LivepeerSymbol } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/docs/mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-4 px-4 md:px-8">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <LivepeerSymbol className="h-4 w-auto" />
          livepeer/ui
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link
            href="/docs/components/accordion"
            className="transition-colors hover:text-foreground"
          >
            Components
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
