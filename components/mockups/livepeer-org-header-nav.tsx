"use client"

import Link from "next/link"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BotIcon,
  CoinsIcon,
  CpuIcon,
  HandCoinsIcon,
  LandmarkIcon,
  MapIcon,
  NewspaperIcon,
  PaletteIcon,
  ShapesIcon,
  type LucideIcon,
} from "lucide-react"

import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const headerGroups = ["Network", "Agent", "Resources"]

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
  "Livepeer Agent": "Create and edit media with your agent",
  "Agent Documentation": "Build with Livepeer AI tools and APIs",
}

const linkIcons: Record<string, LucideIcon> = {
  Ecosystem: ShapesIcon,
  "Livepeer Token": CoinsIcon,
  "Delegate LPT": HandCoinsIcon,
  "Provide GPUs": CpuIcon,
  Roadmap: MapIcon,
  Blog: NewspaperIcon,
  Foundation: LandmarkIcon,
  Brand: PaletteIcon,
  Documentation: BookOpenIcon,
  "Livepeer Agent": BotIcon,
  "Agent Documentation": BookOpenIcon,
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
  "Livepeer Agent": (label, href) =>
    label === "Livepeer Agent" || href.includes("/agent"),
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

function getHeaderGroup(site: LivepeerOrgSite, title: string) {
  if (title === "Agent") {
    const matchesAgent = localLinkMatches["Livepeer Agent"]
    const agentHref =
      site.menuLinks.find((link) => matchesAgent(link.label, link.href))
        ?.href ?? `${site.homeHref}/agent`

    return {
      _key: "agent",
      title: "Agent",
      links: [
        { label: "Livepeer Agent", href: agentHref },
        {
          label: "Agent Documentation",
          href: "https://docs.livepeer.org/v1/ai/builders/get-started",
        },
      ],
    }
  }

  return site.footerGroups.find((item) => item.title === title)
}

export function LivepeerOrgHeaderNav({ site }: { site: LivepeerOrgSite }) {
  return (
    <nav
      className="hidden items-center gap-2 md:flex"
      aria-label="Site sections"
    >
      {headerGroups.map((title) => {
        const group = getHeaderGroup(site, title)
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
                  className="h-auto rounded-sm px-4 py-2.5 font-normal text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:translate-y-0 aria-expanded:bg-muted aria-expanded:text-foreground"
                />
              }
            >
              {group.title}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="grid w-auto min-w-72 auto-cols-72 grid-flow-col grid-rows-2 gap-1 rounded-sm bg-popover p-2 text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-150 data-[side=bottom]:slide-in-from-top-0 dark:ring-foreground/10 data-open:fade-in-0 data-open:zoom-in-100 data-closed:fade-out-0 data-closed:zoom-out-100"
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
                  const Icon = linkIcons[item.label]

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
                      className="min-h-16 items-center rounded-sm bg-transparent px-4 py-3 font-normal shadow-none transition-colors hover:bg-muted focus:bg-muted"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center">
                        <Icon
                          className="size-6 text-muted-foreground"
                          strokeWidth={2}
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-sm text-popover-foreground">
                          {label}
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
