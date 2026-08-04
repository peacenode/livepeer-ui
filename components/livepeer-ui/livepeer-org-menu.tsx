"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { getLivepeerOrgFoundationHref } from "@/components/livepeer-ui/livepeer-org-header-nav"
import type { LivepeerOrgSite } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function LivepeerMenuIcon({ open = false }: { open?: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-8">
      <span
        className={`absolute right-0.5 h-1 w-[30px] origin-[63.333%_50%] transition-[top,transform] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
          open ? "top-1.5 -rotate-45" : "top-0.5"
        }`}
      >
        <span
          className={`block h-full w-full origin-right bg-current transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
            open ? "scale-x-[0.7333]" : "scale-x-100"
          }`}
        />
      </span>
      <span
        className={`absolute right-0.5 h-1 w-[22px] origin-center bg-current transition-[top,transform] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
          open ? "top-1.5 rotate-45" : "top-2.5"
        }`}
      />
    </span>
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
      label: "Provide Compute",
      href: findHref(
        ["GPU", "Provide GPUs", "Provide GPU", "Provide Compute"],
        "/compute",
        `${site.homeHref}/compute`
      ).replace(/\/earn(?=\/|$)/, "/compute"),
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
        <LivepeerMenuIcon open={open} />
        <span className="sr-only">
          {open ? "Close site navigation" : "Open site navigation"}
        </span>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        overlayClassName="bg-transparent transition-none supports-backdrop-filter:backdrop-blur-none"
        className="z-[70] h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-background text-foreground opacity-100 shadow-none transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=top]:h-dvh data-[side=top]:border-b-0 data-[side=top]:data-ending-style:translate-y-0 data-[side=top]:data-starting-style:translate-y-0 motion-reduce:transition-none"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <div className="h-dvh overflow-y-auto px-4 pt-[5.5rem] pb-6 sm:px-6 sm:pt-24 sm:pb-8">
          <nav className="flex flex-col" aria-label="Mobile site sections">
            {showLoginLinks ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginLinks(false)}
                  className="mb-6 flex w-fit items-center gap-2 rounded-sm py-2 font-sans text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowLeftIcon aria-hidden="true" className="size-4" />
                  Back
                </button>
                {loginLinks.map((item) => {
                  const className =
                    "flex items-center gap-2 rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-6xl"
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
                    "rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-6xl"

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
                  className="mt-8 flex items-center gap-2 rounded-sm py-2.5 font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-6xl"
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
