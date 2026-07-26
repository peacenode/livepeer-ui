"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { UserMenu } from "@/components/mockups/user-menu"
import { cn } from "@/lib/utils"

export const platformNavItems = [
  { title: "Home", href: "/mockups/api-console" },
  { title: "Usage", href: "/mockups/api-console/usage" },
  { title: "Keys", href: "/mockups/api-console/api" },
  { title: "Logs", href: "/mockups/api-console/api-logs" },
]

export function PlatformSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-background md:flex">
      <div className="px-5 pt-6 pb-1">
        <Link
          href="/mockups/api-console"
          aria-label="Livepeer home"
          className="inline-flex h-9 items-center"
        >
          <span className="flex items-center gap-1.5 text-black">
            <LivepeerGradientSymbol className="h-4 w-auto" />
            <LivepeerWordmark className="h-4 w-auto" />
          </span>
        </Link>
      </div>
      <nav className="flex flex-col items-start gap-1 px-3 pt-5">
        {platformNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex w-fit rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-muted",
              pathname === item.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit rounded-sm px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Learn
        </a>
      </nav>
      <div className="mt-auto space-y-1 px-3 py-3">
        <Link
          href="/mockups/api-console/account"
          className={cn(
            "inline-flex w-fit rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-muted",
            pathname === "/mockups/api-console/account"
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Manage profile
        </Link>
        <UserMenu />
      </div>
    </aside>
  )
}
