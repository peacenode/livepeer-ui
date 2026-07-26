"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChartColumnIcon,
  CircleUserRoundIcon,
  GraduationCapIcon,
  HomeIcon,
  KeyRoundIcon,
  ScrollTextIcon,
} from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { UserMenu } from "@/components/mockups/user-menu"
import { cn } from "@/lib/utils"

export const platformNavItems = [
  { title: "Home", href: "/mockups/api-console", icon: HomeIcon },
  {
    title: "Usage",
    href: "/mockups/api-console/usage",
    icon: ChartColumnIcon,
  },
  { title: "Keys", href: "/mockups/api-console/api", icon: KeyRoundIcon },
  {
    title: "Logs",
    href: "/mockups/api-console/api-logs",
    icon: ScrollTextIcon,
  },
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
      <nav className="flex flex-col gap-1 px-3 pt-5">
        {platformNavItems.map(({ icon: Icon, ...item }) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-muted",
              pathname === item.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {item.title}
          </Link>
        ))}
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center gap-2 rounded-sm px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <GraduationCapIcon className="size-4" aria-hidden="true" />
          Learn
        </a>
      </nav>
      <div className="mt-auto space-y-1 px-3 py-3">
        <Link
          href="/mockups/api-console/account"
          className={cn(
            "flex w-full items-center gap-2 rounded-sm px-2 py-2.5 text-sm transition-colors hover:bg-muted",
            pathname === "/mockups/api-console/account"
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <CircleUserRoundIcon className="size-4" aria-hidden="true" />
          Manage profile
        </Link>
        <UserMenu />
      </div>
    </aside>
  )
}
