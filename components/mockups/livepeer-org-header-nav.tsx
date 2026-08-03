"use client"

import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const headerGroups = ["Network", "Resources"]

const linkDescriptions: Record<string, string> = {
  Ecosystem: "Explore apps built on Livepeer",
  "Livepeer Token": "Learn how LPT coordinates the network",
  "Delegate LPT": "Stake LPT with network operators",
  "Provide GPUs": "Run an orchestrator and earn fees",
  Roadmap: "See what’s next for the network",
  Primer: "Understand Livepeer in ten minutes",
  Blog: "Updates from across the ecosystem",
  Foundation: "Meet the organization supporting Livepeer",
  Brand: "Logos, guidelines, and brand assets",
  Documentation: "Technical guides and reference",
}

const localLinkMatches: Record<string, (label: string, href: string) => boolean> = {
  Ecosystem: (label, href) => label === "Ecosystem" || href.includes("/ecosystem"),
  "Livepeer Token": (label, href) =>
    label === "Livepeer Token" || href.includes("/token"),
  "Provide GPUs": (label, href) => label === "GPU" || href.includes("/earn"),
  Blog: (label, href) => label === "Blog" || href.includes("/blog"),
  Foundation: (label, href) =>
    label === "Foundation" || href.includes("/foundation"),
}

function resolveHref(site: LivepeerOrgSite, label: string, href: string) {
  const matches = localLinkMatches[label]
  return matches
    ? (site.menuLinks.find((link) => matches(link.label, link.href))?.href ?? href)
    : href
}

export function LivepeerOrgHeaderNav({ site }: { site: LivepeerOrgSite }) {
  return (
    <nav
      className="hidden items-center gap-1 md:flex"
      aria-label="Site sections"
    >
      {headerGroups.map((title) => {
        const group = site.footerGroups.find((item) => item.title === title)
        if (!group) return null

        return (
          <DropdownMenu key={group._key} modal={false}>
            <DropdownMenuTrigger
              openOnHover
              delay={80}
              closeDelay={120}
              render={
                <Button
                  variant="ghost"
                  className="h-9 rounded-full px-4 font-normal text-muted-foreground transition-[color,background-color,box-shadow] hover:bg-transparent hover:text-foreground aria-expanded:bg-white aria-expanded:text-foreground aria-expanded:shadow-sm aria-expanded:ring-1 aria-expanded:ring-black/[0.08] active:translate-y-0"
                />
              }
            >
              {group.title}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="grid w-72 min-w-72 gap-1 rounded-sm bg-white p-2 text-foreground shadow-xl ring-1 ring-black/[0.08] duration-150 data-[side=bottom]:slide-in-from-top-0 data-open:fade-in-0 data-open:zoom-in-100 data-closed:fade-out-0 data-closed:zoom-out-100"
            >
              {group.links.map((item) => {
                const href = resolveHref(site, item.label, item.href)
                const external = href.startsWith("http")

                return (
                  <DropdownMenuItem
                    key={`${item.label}-${href}`}
                    render={
                      external ? (
                        <a href={href} target="_blank" rel="noreferrer" />
                      ) : (
                        <Link href={href} />
                      )
                    }
                    className="min-h-16 items-center rounded-xl border border-black/[0.06] bg-white px-4 py-3 font-normal shadow-xs transition-[background-color,border-color] hover:border-black/[0.1] focus:border-black/[0.1] focus:bg-muted/40"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm text-foreground">
                        {item.label}
                      </span>
                      <span className="text-xs leading-snug text-muted-foreground">
                        {linkDescriptions[item.label]}
                      </span>
                    </span>
                    {external && (
                      <ArrowUpRightIcon className="ml-auto size-3.5 text-muted-foreground" />
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      })}
    </nav>
  )
}
