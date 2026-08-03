"use client"

import * as React from "react"
import Link from "next/link"
import { createPortal } from "react-dom"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { LivepeerOrgHeaderNav } from "@/components/mockups/livepeer-org-header-nav"
import { LivepeerOrgMenu } from "@/components/mockups/livepeer-org-menu"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LivepeerOrgHeader({
  site,
  consoleHref,
  playbooksHref,
  action,
  showMenu = true,
}: {
  site: LivepeerOrgSite
  consoleHref?: string
  playbooksHref?: string
  action?: {
    label: string
    href: string
  }
  showMenu?: boolean
}) {
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )
  const [desktopMenuOpen, setDesktopMenuOpen] = React.useState(false)
  const useLivepeerHref =
    site.menuLinks.find(
      (link) => link.label === "Livepeer Agent" || link.href.includes("/agent")
    )?.href ?? `${site.homeHref}/agent`

  return (
    <>
      {mounted &&
        showMenu &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              data-livepeer-nav-overlay
              className={cn(
                "pointer-events-none fixed inset-x-0 top-16 bottom-0 z-30 bg-black/40 transition-opacity duration-200 ease-out",
                desktopMenuOpen ? "opacity-100" : "opacity-0"
              )}
            />
            <div
              aria-hidden="true"
              data-livepeer-nav-surface
              className={cn(
                "pointer-events-none fixed inset-x-0 top-0 z-40 h-[15.25rem] bg-background transition-transform duration-200 ease-out will-change-transform",
                desktopMenuOpen ? "translate-y-0" : "-translate-y-full"
              )}
            />
          </>,
          document.body
        )}
      <header className="relative z-50 w-full bg-transparent">
        <div className="relative z-10 flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-end gap-5">
            <Link
              href={site.homeHref}
              className="flex shrink-0 items-center gap-3"
              aria-label="Livepeer.org home"
            >
              <span className="flex items-center gap-1.5 text-foreground">
                <LivepeerGradientSymbol className="h-3.5 w-auto sm:h-4" />
                <LivepeerWordmark className="h-3.5 w-auto sm:h-4" />
              </span>
            </Link>
            {showMenu && (
              <LivepeerOrgHeaderNav
                site={site}
                onOpenChange={setDesktopMenuOpen}
              />
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {showMenu && (
              <Button
                nativeButton={false}
                render={<Link href={useLivepeerHref} />}
                className="hidden rounded-sm lg:inline-flex"
              >
                Use Livepeer
              </Button>
            )}
            {playbooksHref && (
              <Button
                variant="secondary"
                size="lg"
                nativeButton={false}
                render={<Link href={playbooksHref} />}
                className="h-12 rounded-sm px-4"
              >
                Playbooks
              </Button>
            )}
            {consoleHref && (
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={consoleHref} />}
                className="h-12 rounded-sm px-4"
              >
                Console
              </Button>
            )}
            {action && (
              <Button
                variant="link"
                nativeButton={false}
                render={<Link href={action.href} />}
                className="px-2 font-medium"
              >
                {action.label} →
              </Button>
            )}
            {showMenu && (
              <div className="lg:hidden">
                <LivepeerOrgMenu site={site} />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
