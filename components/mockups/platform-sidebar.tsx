"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LivepeerLockup } from "@/components/brand"
import { UserMenu } from "@/components/mockups/user-menu"
import { cn } from "@/lib/utils"

const items = [
  { title: "Home", href: "/mockups" },
  { title: "Compute", href: "/mockups/compute" },
  { title: "Inference", href: "/mockups/inference" },
  { title: "Billing", href: "/mockups/billing" },
  { title: "API", href: "/mockups/api" },
]

export function PlatformSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 flex h-dvh w-56 shrink-0 flex-col border-r bg-background">
      <div className="px-5 pt-6 pb-8">
        <Link href="/mockups" aria-label="Livepeer home" className="inline-flex">
          <LivepeerLockup className="h-4 w-auto" />
        </Link>
      </div>
      <nav className="flex flex-col items-start gap-1 px-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
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
