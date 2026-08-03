"use client"

import * as React from "react"
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
import { cn } from "@/lib/utils"

const headerGroups = ["Network", "Agent", "Resources", "Foundation"]

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
  const [activeTitle, setActiveTitle] = React.useState<string | null>(null)
  const [renderedTitle, setRenderedTitle] = React.useState("Network")
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const renderedGroup = getHeaderGroup(site, renderedTitle)
  const renderedLinks = renderedGroup
    ? [...renderedGroup.links]
        .filter(
          (item) => item.label !== "Primer" && item.label !== "Foundation"
        )
        .sort((a, b) => {
          const order =
            renderedGroup.title === "Resources"
              ? resourceOrder
              : renderedGroup.title === "Network"
                ? networkOrder
                : null

          return order ? (order[a.label] ?? 99) - (order[b.label] ?? 99) : 0
        })
    : []
  const panelWidth = Math.ceil(renderedLinks.length / 2) * 288 + 16

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const openMenu = React.useCallback(
    (title: string) => {
      cancelClose()
      setRenderedTitle(title)
      setActiveTitle(title)
    },
    [cancelClose]
  )

  const scheduleClose = React.useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setActiveTitle(null), 140)
  }, [cancelClose])

  React.useEffect(() => {
    return () => cancelClose()
  }, [cancelClose])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveTitle(null)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <nav
      className="relative hidden translate-y-1 items-end gap-0 lg:flex"
      aria-label="Site sections"
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose()
      }}
    >
      {headerGroups.map((title) => {
        if (title === "Foundation") {
          return (
            <Button
              key={title}
              variant="ghost"
              nativeButton={false}
              render={
                <Link
                  href={resolveHref(
                    site,
                    "Foundation",
                    "https://livepeer.org/foundation"
                  )}
                />
              }
              className="h-auto rounded-sm px-3 py-0 leading-none font-normal text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
            >
              Foundation
            </Button>
          )
        }

        const group = getHeaderGroup(site, title)
        if (!group) return null

        return (
          <Button
            key={group._key}
            variant="ghost"
            aria-haspopup="true"
            aria-controls="livepeer-header-menu"
            aria-expanded={activeTitle === title}
            onPointerEnter={() => openMenu(title)}
            onFocus={() => openMenu(title)}
            onClick={() => openMenu(title)}
            className="h-auto rounded-sm px-3 py-0 leading-none font-normal text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground active:translate-y-0 aria-expanded:bg-transparent aria-expanded:text-foreground dark:hover:bg-transparent"
          >
            {group.title}
          </Button>
        )
      })}

      <div
        id="livepeer-header-menu"
        aria-label={`${renderedTitle} menu`}
        aria-hidden={!activeTitle}
        inert={!activeTitle}
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
        style={{ width: panelWidth }}
        className={cn(
          "absolute top-[calc(100%+2rem)] left-0 overflow-hidden rounded-sm bg-popover text-popover-foreground shadow-xl ring-1 ring-foreground/5 transition-[width,opacity,transform] duration-200 ease-out will-change-[width,opacity,transform] dark:ring-foreground/10",
          activeTitle
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div
          key={renderedTitle}
          className="grid auto-cols-72 grid-flow-col grid-rows-2 gap-1 p-2 data-[switching=true]:opacity-0 motion-safe:animate-in motion-safe:duration-150 motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
        >
          {renderedLinks.map((item) => {
            const href = resolveHref(site, item.label, item.href)
            const external = href.startsWith("http")
            const label = item.label === "Blog" ? "Latest Updates" : item.label
            const Icon = linkIcons[item.label]

            const content = (
              <>
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
              </>
            )

            const className =
              "flex min-h-16 items-center rounded-sm bg-transparent px-4 py-3 font-normal shadow-none outline-none transition-colors hover:bg-muted focus-visible:bg-muted"

            return external ? (
              <a
                key={`${item.label}-${href}`}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={className}
                onClick={() => setActiveTitle(null)}
              >
                {content}
              </a>
            ) : (
              <Link
                key={`${item.label}-${href}`}
                href={href}
                className={className}
                onClick={() => setActiveTitle(null)}
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
