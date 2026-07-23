"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LivepeerLockup } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
      <nav className="flex flex-col gap-1 px-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 px-5 py-5">
        <Avatar className="size-9">
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col text-sm leading-tight">
          <span className="font-medium">Username</span>
          <span className="text-muted-foreground">Organization</span>
        </div>
      </div>
    </aside>
  )
}
