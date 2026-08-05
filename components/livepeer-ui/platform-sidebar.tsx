"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"

import { PlatformBrandLink } from "@/components/livepeer-ui/platform-brand-link"
import { UserMenu } from "@/components/livepeer-ui/user-menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6 md:hidden">
      <PlatformBrandLink ariaLabel={homeAriaLabel} href={homeHref} />
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Open navigation" />
          }
        >
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="w-full max-w-xs p-0" side="right">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="border-b px-5 py-4">
            <PlatformBrandLink ariaLabel={homeAriaLabel} href={homeHref} />
          </div>
          <nav className="flex flex-col items-start gap-1 px-3 py-4">
            {navigation.map((item) => (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={<Link href={item.href} />}
                className={cn(
                  "inline-flex w-full items-center gap-1 rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                  pathname === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {item.external && (
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                )}
              </SheetClose>
            ))}
          </nav>
          <div className="mt-auto border-t p-3">
            <UserMenu
              content={userMenuContent}
              user={user}
              profileHref={profileHref}
            />
          </div>
        </SheetContent>
      </Sheet>
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
