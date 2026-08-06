"use client"

import * as React from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { ChevronDownIcon } from "lucide-react"

import { LivepeerLogo } from "@/components/brand"
import { LivepeerOrgHeaderNav } from "@/components/livepeer-ui/livepeer-org-header-nav"
import { LivepeerOrgMenu } from "@/components/livepeer-ui/livepeer-org-menu"
import type { LivepeerOrgSite } from "@/components/livepeer-ui/contracts"
import type { LivepeerOrgNavigationImages } from "@/sanity/lib/livepeer-org-navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const loginLinks = [
  {
    label: "Forum",
    href: "https://forum.livepeer.org",
  },
  {
    label: "Orchestrators",
    href: "https://explorer.livepeer.org/orchestrators",
  },
  {
    label: "Agent Console",
    href: "/mockups/livepeer-agent",
  },
] as const

export function LivepeerOrgHeader({
  site,
  navigationImages,
  consoleHref,
  playbooksHref,
  action,
  utility,
  onLogoClick,
  showMenu = true,
}: {
  site: LivepeerOrgSite
  navigationImages?: LivepeerOrgNavigationImages
  consoleHref?: string
  playbooksHref?: string
  action?: {
    label: string
    href: string
    variant?: "link" | "muted" | "secondary"
    className?: string
    showArrow?: boolean
  }
  utility?: React.ReactNode
  onLogoClick?: () => void
  showMenu?: boolean
}) {
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )
  const [desktopMenuOpen, setDesktopMenuOpen] = React.useState(false)
  const [loginMenuOpen, setLoginMenuOpen] = React.useState(false)
  const loginCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const useLivepeerHref =
    site.menuLinks.find(
      (link) => link.label === "Livepeer Agent" || link.href.includes("/agent")
    )?.href ?? `${site.homeHref}/agent`

  const cancelLoginClose = React.useCallback(() => {
    if (loginCloseTimer.current) {
      clearTimeout(loginCloseTimer.current)
      loginCloseTimer.current = null
    }
  }, [])

  const scheduleLoginClose = React.useCallback(() => {
    cancelLoginClose()
    loginCloseTimer.current = setTimeout(() => setLoginMenuOpen(false), 100)
  }, [cancelLoginClose])

  React.useEffect(() => () => cancelLoginClose(), [cancelLoginClose])

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
                "pointer-events-none fixed inset-0 z-[72] bg-black/5 backdrop-blur-sm transition-opacity duration-75 ease-out",
                desktopMenuOpen ? "opacity-100" : "opacity-0"
              )}
            />
          </>,
          document.body
        )}
      <header className="relative z-50 w-full bg-transparent text-current transition-colors duration-100 ease-out">
        <div className="relative z-10 mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-end gap-5">
            <Link
              href={site.homeHref}
              onClick={(event) => {
                if (!onLogoClick) return
                event.preventDefault()
                onLogoClick()
              }}
              className="relative z-10 flex shrink-0 items-center gap-3 text-current transition-colors duration-100 ease-out"
              aria-label="Livepeer.org home"
            >
              <LivepeerLogo />
            </Link>
            {showMenu && (
              <LivepeerOrgHeaderNav
                site={site}
                navigationImages={navigationImages}
                onOpenChange={setDesktopMenuOpen}
              />
            )}
          </div>
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            {utility}
            {showMenu && (
              <>
                <div
                  className="hidden lg:block"
                  onPointerEnter={() => {
                    cancelLoginClose()
                    setLoginMenuOpen(true)
                  }}
                  onPointerLeave={scheduleLoginClose}
                >
                  <DropdownMenu
                    open={loginMenuOpen}
                    onOpenChange={setLoginMenuOpen}
                  >
                    <DropdownMenuTrigger
                      render={
                        <Button variant="secondary" className="rounded-sm" />
                      }
                    >
                      Log in
                      <ChevronDownIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={8}
                      positionerClassName="z-[90]"
                      className="w-max min-w-0 rounded-sm bg-secondary p-1"
                      onPointerEnter={cancelLoginClose}
                      onPointerLeave={scheduleLoginClose}
                    >
                      {loginLinks.map((item) => {
                        const external = item.href.startsWith("http")

                        return (
                          <DropdownMenuItem
                            key={item.label}
                            render={
                              external ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noreferrer"
                                />
                              ) : (
                                <Link href={item.href} />
                              )
                            }
                            className="cursor-pointer rounded-sm px-2.5 py-2"
                          >
                            <span>
                              {item.label} <span aria-hidden="true">↗</span>
                            </span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  nativeButton={false}
                  render={<Link href={useLivepeerHref} />}
                  className="hidden rounded-sm lg:inline-flex"
                >
                  Use Livepeer
                </Button>
              </>
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
                variant={action.variant ?? "link"}
                nativeButton={false}
                render={<Link href={action.href} />}
                className={cn(
                  "font-medium",
                  action.variant === "secondary" || action.variant === "muted"
                    ? "rounded-sm"
                    : "px-2",
                  action.className
                )}
              >
                {action.label}
                {(action.showArrow ||
                  (action.variant !== "secondary" &&
                    action.variant !== "muted")) && (
                  <span className="font-sans" aria-hidden="true">
                    →
                  </span>
                )}
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
