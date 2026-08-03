"use client"

import Link from "next/link"
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react"

import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const headerGroups = ["Network", "Resources"]

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
    <nav className="hidden items-center md:flex" aria-label="Site sections">
      {headerGroups.map((title) => {
        const group = site.footerGroups.find((item) => item.title === title)
        if (!group) return null

        return (
          <DropdownMenu key={group._key}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="group h-11 gap-1.5 rounded-sm px-3 font-normal hover:bg-transparent active:translate-y-0"
                />
              }
            >
              {group.title}
              <ChevronDownIcon className="size-3.5 transition-transform duration-150 group-aria-expanded:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="w-64 min-w-64 rounded-sm bg-white p-2 text-foreground shadow-xl ring-1 ring-black/[0.08] duration-150 data-[side=bottom]:slide-in-from-top-0 data-open:fade-in-0 data-open:zoom-in-100 data-closed:fade-out-0 data-closed:zoom-out-100"
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
                    className="min-h-11 rounded-sm px-3 font-normal"
                  >
                    <span>{item.label}</span>
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
