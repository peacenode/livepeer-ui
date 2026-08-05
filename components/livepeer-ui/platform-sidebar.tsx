"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { MobileNavigationMenu } from "@/components/livepeer-ui/mobile-navigation-menu"
import { PlatformBrandLink } from "@/components/livepeer-ui/platform-brand-link"
import { UserMenu } from "@/components/livepeer-ui/user-menu"
import { cn } from "@/lib/utils"
import type {
  AgentConsoleShell,
  AgentConsoleUser,
} from "@/components/livepeer-ui/contracts"

type PlatformNavigationProps = {
  homeAriaLabel: string
  navigation: AgentConsoleShell["navigation"]
  userMenuContent: AgentConsoleShell["userMenu"]
  user: AgentConsoleUser
  homeHref?: string
  profileHref?: string
}

export function PlatformMobileHeader({
  homeAriaLabel,
  navigation,
  userMenuContent,
  user,
  homeHref = "/mockups/livepeer-agent",
  profileHref,
}: PlatformNavigationProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6 md:hidden">
      <PlatformBrandLink ariaLabel={homeAriaLabel} href={homeHref} />
      <MobileNavigationMenu
        title="console navigation"
        open={open}
        onOpenChange={setOpen}
        header={<PlatformBrandLink ariaLabel={homeAriaLabel} href={homeHref} />}
      >
        {(close) => (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
            <nav className="flex flex-col pt-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "inline-flex w-fit items-center gap-1 rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-muted",
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
            <div className="-mx-4 mt-auto border-t px-4 pt-3 sm:-mx-6 sm:px-6">
              <UserMenu
                content={userMenuContent}
                user={user}
                profileHref={profileHref}
              />
            </div>
          </div>
        )}
      </MobileNavigationMenu>
    </header>
  )
}

export function PlatformSidebar({
  className,
  homeAriaLabel,
  navigation,
  userMenuContent,
  user,
  homeHref = "/mockups/livepeer-agent",
  profileHref,
}: PlatformNavigationProps & {
  className?: string
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
        <PlatformBrandLink ariaLabel={homeAriaLabel} href={homeHref} />
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
