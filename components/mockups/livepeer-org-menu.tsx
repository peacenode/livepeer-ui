"use client"

import * as React from "react"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { getLivepeerOrgFoundationHref } from "@/components/mockups/livepeer-org-header-nav"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function LivepeerMenuIcon() {
  return (
    <svg
      viewBox="0 0 32 16"
      fill="currentColor"
      aria-hidden="true"
      className="size-4 w-8"
    >
      <path d="M1 2h30v4H1zM9 10h22v4H9z" />
    </svg>
  )
}

const loginLinks = [
  { label: "Forum", href: "https://forum.livepeer.org" },
  {
    label: "Orchestrator",
    href: "https://explorer.livepeer.org/orchestrators",
  },
  { label: "Agent Console", href: "/mockups/livepeer-agent" },
] as const

export function LivepeerOrgMenu({ site }: { site: LivepeerOrgSite }) {
  const [open, setOpen] = React.useState(false)
  const [showLoginLinks, setShowLoginLinks] = React.useState(false)
  const allLinks = [
    ...site.menuLinks,
    ...site.footerGroups.flatMap((group) => group.links),
  ]
  const findHref = (labels: string[], path: string, fallback: string) =>
    site.menuLinks.find(
      (link) => labels.includes(link.label) || link.href.includes(path)
    )?.href ??
    allLinks.find(
      (link) => labels.includes(link.label) || link.href.includes(path)
    )?.href ??
    fallback
  const mobileLinks = [
    { label: "Home", href: site.homeHref },
    { label: "Foundation", href: getLivepeerOrgFoundationHref(site) },
    {
      label: "Ecosystem",
      href: findHref(["Ecosystem"], "/ecosystem", `${site.homeHref}/ecosystem`),
    },
    {
      label: "Agent",
      href: findHref(
        ["Livepeer Agent", "Agent"],
        "/agent",
        `${site.homeHref}/agent`
      ),
    },
    {
      label: "$LPT",
      href: findHref(
        ["Livepeer Token", "$LPT"],
        "/token",
        `${site.homeHref}/token`
      ),
    },
    {
      label: "Provide GPU",
      href: findHref(
        ["GPU", "Provide GPUs", "Provide GPU"],
        "/earn",
        `${site.homeHref}/earn`
      ),
    },
    {
      label: "Latest Updates",
      href: findHref(
        ["Blog", "Latest Updates"],
        "/blog",
        `${site.homeHref}/blog`
      ),
    },
  ]

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) setShowLoginLinks(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-transparent hover:text-foreground aria-expanded:bg-transparent dark:hover:bg-transparent"
          />
        }
      >
        <LivepeerMenuIcon />
        <span className="sr-only">Open site navigation</span>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        overlayClassName="bg-transparent transition-none supports-backdrop-filter:backdrop-blur-none"
        className="z-[90] h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-background text-foreground opacity-100 shadow-none transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=top]:h-dvh data-[side=top]:border-b-0 data-[side=top]:data-ending-style:translate-y-0 data-[side=top]:data-starting-style:translate-y-0 motion-reduce:transition-none"
      >
        <header className="flex h-16 items-center justify-between px-4 sm:px-6">
          <SheetTitle className="text-left">
            <Link
              href={site.homeHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Livepeer"
            >
              <LivepeerGradientSymbol className="h-3.5 w-auto sm:h-4" />
              <LivepeerWordmark className="h-3.5 w-auto sm:h-4" />
            </Link>
          </SheetTitle>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="hover:bg-transparent hover:text-muted-foreground dark:hover:bg-transparent"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close site navigation</span>
          </SheetClose>
        </header>

        <div className="h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <nav className="flex flex-col" aria-label="Mobile site sections">
            {showLoginLinks ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginLinks(false)}
                  className="mb-6 flex w-fit items-center gap-2 rounded-sm py-2 font-sans text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span aria-hidden="true">←</span>
                  Back
                </button>
                {loginLinks.map((item) => {
                  const className =
                    "flex items-center gap-2 rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-[clamp(2.5rem,4.5vw,4rem)]"
                  const content = (
                    <>
                      <span>{item.label}</span>
                      <span aria-hidden="true">↗</span>
                    </>
                  )

                  return item.href.startsWith("http") ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {content}
                    </Link>
                  )
                })}
              </>
            ) : (
              <>
                {mobileLinks.map((item) => {
                  const className =
                    "rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-[clamp(2.5rem,4.5vw,4rem)]"

                  return item.href.startsWith("http") ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setShowLoginLinks(true)}
                  className="mt-8 flex items-center gap-2 rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-[clamp(2.5rem,4.5vw,4rem)]"
                >
                  <span>Login</span>
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
