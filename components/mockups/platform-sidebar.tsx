"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon } from "lucide-react"

import { PlatformBrandLink } from "@/components/mockups/platform-brand-link"
import { UserMenu } from "@/components/mockups/user-menu"
import { cn } from "@/lib/utils"
import type {
  AgentConsoleShell,
  AgentConsoleUser,
} from "@/components/mockups/contracts"

export function PlatformSidebar({
  className,
  homeAriaLabel,
  navigation,
  userMenuContent,
  user,
  homeHref = "/mockups/livepeer-agent",
  profileHref,
}: {
  className?: string
  homeAriaLabel: string
  navigation: AgentConsoleShell["navigation"]
  userMenuContent: AgentConsoleShell["userMenu"]
  user: AgentConsoleUser
  homeHref?: string
  profileHref?: string
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-full w-64 shrink-0 flex-col bg-background md:flex",
        className
      )}
    >
      <div className="px-5 pt-6 pb-1">
        <PlatformBrandLink
          ariaLabel={homeAriaLabel}
          href={homeHref}
        />
      </div>
      <nav className="flex flex-col items-start gap-1 px-3 pt-5">
        {navigation.map((item) => (
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
            {item.label}
            {item.external && (
              <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-3 py-3">
        <UserMenu
          content={userMenuContent}
          user={user}
          profileHref={profileHref}
        />
      </div>
    </aside>
  )
}
