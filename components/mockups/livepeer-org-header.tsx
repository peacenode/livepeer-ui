"use client"

import * as React from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { ChevronDownIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { LivepeerOrgHeaderNav } from "@/components/mockups/livepeer-org-header-nav"
import { LivepeerOrgMenu } from "@/components/mockups/livepeer-org-menu"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"
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
  showMenu = true,
}: {
  site: LivepeerOrgSite
  navigationImages?: LivepeerOrgNavigationImages
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
        createPortal(
          <div
            aria-hidden="true"
            data-livepeer-header-surface
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-16 bg-background"
          />,
          document.body
        )}
      {mounted &&
        showMenu &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              data-livepeer-nav-overlay
              className={cn(
                "pointer-events-none fixed inset-x-0 top-16 bottom-0 z-[72] bg-black/5 backdrop-blur transition-opacity duration-100 ease-out",
                desktopMenuOpen ? "opacity-100" : "opacity-0"
              )}
            />
          </>,
          document.body
        )}
      <header className="relative z-50 w-full bg-transparent">
        <div className="relative z-10 flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6">
          <div className="flex min-w-0 items-end gap-5">
            <Link
              href={site.homeHref}
              className="flex shrink-0 items-center gap-3"
              aria-label="Livepeer.org home"
            >
              <span className="flex items-center gap-1.5 text-foreground">
                <LivepeerGradientSymbol className="h-4 w-auto" />
                <LivepeerWordmark className="h-4 w-auto" />
              </span>
            </Link>
            {showMenu && (
              <LivepeerOrgHeaderNav
                site={site}
                navigationImages={navigationImages}
                onOpenChange={setDesktopMenuOpen}
              />
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {showMenu && (
              <>
                <div className="hidden lg:block">
                  <DropdownMenu>
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
                      className="w-72 rounded-sm p-1.5"
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
                            className="cursor-pointer justify-between rounded-sm px-3 py-2.5"
                          >
                            <span>{item.label}</span>
                            <span
                              aria-hidden="true"
                              className="font-sans text-muted-foreground"
                            >
                              ↗
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
