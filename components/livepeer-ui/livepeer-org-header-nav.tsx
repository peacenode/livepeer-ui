"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import type {
  EditorialLink,
  LivepeerOrgSite,
} from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LivepeerOrgNavigationImages } from "@/sanity/lib/livepeer-org-navigation"

export const livepeerOrgHeaderGroups = [
  "Network",
  "Agent",
  "Resources",
] as const

const headerItems = [...livepeerOrgHeaderGroups, "Foundation"] as const

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
  "Agent Playbooks": "Run production-ready workflows in Agent Console",
  "Agent Documentation": "Build with Livepeer AI tools and APIs",
}

const localLinkMatches: Record<
  string,
  (label: string, href: string) => boolean
> = {
  Ecosystem: (label, href) =>
    label === "Ecosystem" || href.includes("/ecosystem"),
  "Livepeer Token": (label, href) =>
    label === "Livepeer Token" || href.includes("/token"),
  "Provide GPUs": (label, href) => label === "GPU" || href.includes("/compute"),
  Blog: (label, href) => label === "Blog" || href.includes("/blog"),
  Foundation: (label, href) =>
    label === "Foundation" || href.includes("/foundation"),
  "Livepeer Agent": (label, href) =>
    label === "Livepeer Agent" || href.includes("/agent"),
}

const resourceOrder: Record<string, number> = {
  Blog: 0,
  Brand: 1,
  Roadmap: 2,
  Documentation: 3,
}

const networkOrder: Record<string, number> = {
  Ecosystem: 0,
  "Provide GPUs": 1,
  "Livepeer Token": 2,
  "Delegate LPT": 3,
  Roadmap: 4,
}

function resolveHref(site: LivepeerOrgSite, label: string, href: string) {
  const matches = localLinkMatches[label]
  const resolvedHref = matches
    ? (site.menuLinks.find((link) => matches(link.label, link.href))?.href ??
      href)
    : href

  return label === "Provide GPUs"
    ? resolvedHref.replace(/\/earn(?=\/|$)/, "/compute")
    : resolvedHref
}

export function getLivepeerOrgHeaderGroup(
  site: LivepeerOrgSite,
  title: (typeof livepeerOrgHeaderGroups)[number]
) {
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
          label: "Agent Playbooks",
          href: "/mockups/livepeer-agent/playbooks",
        },
        {
          label: "Agent Documentation",
          href: "https://docs.livepeer.org/v1/ai/builders/get-started",
        },
      ],
    }
  }

  if (title === "Resources") {
    const resources = site.footerGroups.find((item) => item.title === title)
    const roadmap = site.footerGroups
      .find((item) => item.title === "Network")
      ?.links.find((item) => item.label === "Roadmap")

    return resources
      ? {
          ...resources,
          links: roadmap ? [...resources.links, roadmap] : resources.links,
        }
      : undefined
  }

  return site.footerGroups.find((item) => item.title === title)
}

export function getLivepeerOrgHeaderLinks(
  group: NonNullable<ReturnType<typeof getLivepeerOrgHeaderGroup>>
) {
  return [...group.links]
    .filter(
      (item) =>
        item.label !== "Primer" &&
        item.label !== "Foundation" &&
        !(group.title === "Network" && item.label === "Roadmap")
    )
    .sort((a, b) => {
      const order =
        group.title === "Resources"
          ? resourceOrder
          : group.title === "Network"
            ? networkOrder
            : null

      return order ? (order[a.label] ?? 99) - (order[b.label] ?? 99) : 0
    })
}

export function getLivepeerOrgFoundationHref(site: LivepeerOrgSite) {
  return resolveHref(site, "Foundation", "https://livepeer.org/foundation")
}

export function LivepeerOrgNavItem({
  site,
  item,
  navigationImages,
  onNavigate,
  className,
}: {
  site: LivepeerOrgSite
  item: EditorialLink
  navigationImages?: LivepeerOrgNavigationImages
  onNavigate?: () => void
  className?: string
}) {
  const href = resolveHref(site, item.label, item.href)
  const jumpOut = href.startsWith("http") || item.label === "Agent Playbooks"
  const label =
    item.label === "Blog"
      ? "Latest Updates"
      : item.label === "Provide GPUs"
        ? "Provide Compute"
        : item.label
  const image = navigationImages?.[item.label]
  const content = (
    <>
      <span className="relative aspect-[3/4] h-full shrink-0 overflow-hidden rounded-xs bg-muted">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
        <span className="flex items-start gap-1.5 text-sm text-foreground">
          <span className="min-w-0 truncate">{label}</span>
          {jumpOut && (
            <ArrowUpRightIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          )}
        </span>
        <span className="text-xs leading-snug text-pretty text-muted-foreground">
          {linkDescriptions[item.label]}
        </span>
      </span>
    </>
  )
  const itemClassName = cn(
    "group flex h-full min-w-0 items-stretch gap-3 rounded-sm bg-transparent p-2 font-normal shadow-none transition-colors outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
    className
  )

  return jumpOut ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={itemClassName}
      onClick={onNavigate}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={itemClassName} onClick={onNavigate}>
      {content}
    </Link>
  )
}

export function LivepeerOrgHeaderNav({
  site,
  navigationImages,
  onOpenChange,
}: {
  site: LivepeerOrgSite
  navigationImages?: LivepeerOrgNavigationImages
  onOpenChange?: (open: boolean) => void
}) {
  const [activeTitle, setActiveTitle] = React.useState<string | null>(null)
  const [renderedTitle, setRenderedTitle] = React.useState("Network")
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const renderedGroup = getLivepeerOrgHeaderGroup(
    site,
    renderedTitle as (typeof livepeerOrgHeaderGroups)[number]
  )
  const renderedLinks = renderedGroup
    ? getLivepeerOrgHeaderLinks(renderedGroup)
    : []

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
    closeTimer.current = setTimeout(() => setActiveTitle(null), 100)
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

  React.useEffect(() => {
    if (!activeTitle) return

    const onScroll = () => setActiveTitle(null)

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [activeTitle])

  React.useLayoutEffect(() => {
    onOpenChange?.(activeTitle !== null)
  }, [activeTitle, onOpenChange])

  return (
    <>
      <nav
        className="relative top-1 z-10 hidden items-end gap-0 before:absolute before:inset-x-0 before:-top-7 before:h-7 before:content-[''] lg:flex"
        aria-label="Site sections"
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            scheduleClose()
        }}
      >
        {headerItems.map((title) => {
          if (title === "Foundation") {
            return (
              <Button
                key={title}
                variant="ghost"
                nativeButton={false}
                render={<Link href={getLivepeerOrgFoundationHref(site)} />}
                onPointerEnter={() => setActiveTitle(null)}
                onFocus={() => setActiveTitle(null)}
                className="h-auto rounded-sm px-3 py-0 leading-none font-normal text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground active:translate-y-0 dark:hover:bg-transparent"
              >
                Foundation
              </Button>
            )
          }

          const group = getLivepeerOrgHeaderGroup(site, title)
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
      </nav>

      <div
        id="livepeer-header-menu"
        aria-label={`${renderedTitle} menu`}
        aria-hidden={!activeTitle}
        inert={!activeTitle}
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
        className={cn(
          "absolute top-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden bg-background text-foreground transition-[opacity,transform] duration-75 ease-out will-change-[opacity,transform]",
          activeTitle
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="px-4 pt-[4.75rem] pb-6 sm:px-6 lg:px-10">
          <div
            key={renderedTitle}
            className="mx-auto grid max-w-7xl grid-cols-3 gap-2 data-[switching=true]:opacity-0 motion-safe:animate-in motion-safe:duration-75 motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 xl:grid-cols-4"
          >
            {renderedLinks.map((item) => (
              <LivepeerOrgNavItem
                key={`${item.label}-${item.href}`}
                site={site}
                item={item}
                navigationImages={navigationImages}
                onNavigate={() => setActiveTitle(null)}
                className="h-36"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
