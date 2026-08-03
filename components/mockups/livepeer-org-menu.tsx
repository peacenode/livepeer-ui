"use client"

import * as React from "react"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import {
  getLivepeerOrgFoundationHref,
  getLivepeerOrgHeaderGroup,
  getLivepeerOrgHeaderLinks,
  livepeerOrgHeaderGroups,
  LivepeerOrgNavItem,
} from "@/components/mockups/livepeer-org-header-nav"
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

export function LivepeerOrgMenu({ site }: { site: LivepeerOrgSite }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
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
        className="h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-background text-foreground opacity-100 shadow-none transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=top]:h-dvh data-[side=top]:border-b-0 data-[side=top]:data-ending-style:translate-y-0 data-[side=top]:data-starting-style:translate-y-0 motion-reduce:transition-none"
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
          <nav className="grid gap-8" aria-label="Mobile site sections">
            {livepeerOrgHeaderGroups.map((title) => {
              const group = getLivepeerOrgHeaderGroup(site, title)
              if (!group) return null

              return (
                <section
                  key={group._key}
                  aria-labelledby={`${group._key}-title`}
                >
                  <h2
                    id={`${group._key}-title`}
                    className="px-4 text-xs font-medium text-muted-foreground"
                  >
                    {group.title}
                  </h2>
                  <div className="mt-2 grid gap-1 sm:grid-cols-2">
                    {getLivepeerOrgHeaderLinks(group).map((item) => (
                      <LivepeerOrgNavItem
                        key={`${item.label}-${item.href}`}
                        site={site}
                        item={item}
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </div>
                </section>
              )
            })}

            <Link
              href={getLivepeerOrgFoundationHref(site)}
              onClick={() => setOpen(false)}
              className="rounded-sm px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:bg-muted"
            >
              Foundation
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
