"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LivepeerLockup } from "@/components/brand"
import { UserMenu } from "@/components/mockups/user-menu"
import { cn } from "@/lib/utils"

export const platformNavItems = [
  { title: "Home", href: "/mockups/platform" },
  { title: "Compute", href: "/mockups/platform/compute" },
  { title: "Inference", href: "/mockups/platform/inference" },
  { title: "Billing", href: "/mockups/platform/billing" },
  { title: "API", href: "/mockups/platform/api" },
]

export function PlatformSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col bg-background md:flex">
      <div className="px-5 pt-6 pb-6">
        <Link href="/mockups/platform" aria-label="Livepeer home" className="inline-flex">
          <LivepeerLockup className="h-4 w-auto" />
        </Link>
      </div>
      <nav className="flex flex-col items-start px-3">
        {platformNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-muted",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-3 py-3">
        <UserMenu />
      </div>
    </aside>
  )
}
