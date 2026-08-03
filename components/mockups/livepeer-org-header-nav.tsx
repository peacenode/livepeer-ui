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
  Blog: "Updates from across the ecosystem",
  Foundation: "Meet the organization supporting Livepeer",
  Brand: "Logos, guidelines, and brand assets",
  Documentation: "Technical guides and reference",
}

const localLinkMatches: Record<
  string,
  (label: string, href: string) => boolean
> = {
  Ecosystem: (label, href) =>
    label === "Ecosystem" || href.includes("/ecosystem"),
  "Livepeer Token": (label, href) =>
    label === "Livepeer Token" || href.includes("/token"),
  "Provide GPUs": (label, href) => label === "GPU" || href.includes("/earn"),
  Blog: (label, href) => label === "Blog" || href.includes("/blog"),
  Foundation: (label, href) =>
    label === "Foundation" || href.includes("/foundation"),
}

const resourceOrder: Record<string, number> = {
  Foundation: 0,
  Blog: 1,
  Brand: 2,
  Documentation: 3,
}

const networkOrder: Record<string, number> = {
  Ecosystem: 0,
  "Livepeer Token": 1,
  "Provide GPUs": 2,
  "Delegate LPT": 3,
  Roadmap: 4,
}

function resolveHref(site: LivepeerOrgSite, label: string, href: string) {
  const matches = localLinkMatches[label]
  return matches
    ? (site.menuLinks.find((link) => matches(link.label, link.href))?.href ??
        href)
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
                  className="h-9 rounded-full px-4 font-normal text-muted-foreground transition-[color,background-color,box-shadow] hover:bg-transparent hover:text-foreground active:translate-y-0 aria-expanded:bg-white aria-expanded:text-foreground aria-expanded:shadow-sm aria-expanded:ring-1 aria-expanded:ring-black/[0.08]"
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
              {[...group.links]
                .filter((item) => item.label !== "Primer")
                .sort((a, b) => {
                  const order =
                    group.title === "Resources"
                      ? resourceOrder
                      : group.title === "Network"
                        ? networkOrder
                        : null

                  return order
                    ? (order[a.label] ?? 99) - (order[b.label] ?? 99)
                    : 0
                })
                .map((item) => {
                  const href = resolveHref(site, item.label, item.href)
                  const external = href.startsWith("http")
                  const label =
                    item.label === "Blog" ? "Latest Updates" : item.label

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
                    className="min-h-16 items-center rounded-sm bg-white px-4 py-3 font-normal shadow-none transition-[background-color,box-shadow] hover:bg-muted/40 hover:shadow-[inset_0_1px_3px_rgb(0_0_0/0.08)] focus:bg-muted/40 focus:shadow-[inset_0_1px_3px_rgb(0_0_0/0.08)]"
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-sm text-foreground">{label}</span>
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
