"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, GlobeIcon, XIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import {
  DiscordIcon,
  GitHubIcon,
  XIcon as SocialXIcon,
} from "@/components/brand-social-icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"

const socialIcons = {
  discord: DiscordIcon,
  x: SocialXIcon,
  github: GitHubIcon,
  website: GlobeIcon,
}

const menuOrder = [
  {
    label: "Home",
    matches: (label: string, href: string) =>
      label === "Home" || href.endsWith("/livepeer-org"),
  },
  {
    label: "Foundation",
    matches: (_label: string, href: string) => href.includes("/foundation"),
  },
  {
    label: "Ecosystem",
    matches: (_label: string, href: string) => href.includes("/ecosystem"),
  },
  {
    label: "Agent",
    matches: (_label: string, href: string) => href.includes("/agent"),
  },
  {
    label: "GPU",
    matches: (label: string, href: string) =>
      label === "GPU" || href.includes("/earn"),
  },
  {
    label: "Token",
    matches: (_label: string, href: string) => href.includes("/token"),
  },
  {
    label: "Updates",
    matches: (label: string, href: string) =>
      label === "Updates" || href.includes("/blog"),
  },
]

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
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const menuLinks = menuOrder.flatMap(({ label, matches }) => {
    const link = site.menuLinks.find((item) => matches(item.label, item.href))
    return link ? [{ ...link, label }] : []
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-transparent hover:text-emerald-500"
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
        className="h-dvh max-h-none overflow-y-auto border-0 bg-foreground text-background shadow-none duration-200 ease-out data-ending-style:opacity-100 data-ending-style:duration-150 data-ending-style:ease-in data-starting-style:opacity-100 data-[side=top]:border-b-0 motion-reduce:transition-none sm:h-auto sm:max-h-dvh"
      >
        <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
          <SheetTitle className="text-left">
            <span
              className="flex items-center gap-1.5 text-background"
              aria-label="Livepeer"
            >
              <LivepeerGradientSymbol className="h-3.5 w-auto sm:h-4" />
              <LivepeerWordmark className="h-3.5 w-auto sm:h-4" />
            </span>
          </SheetTitle>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-background hover:bg-transparent hover:text-emerald-500"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close site navigation</span>
          </SheetClose>
        </header>

        <div className="grid gap-12 px-4 pt-10 pb-8 sm:gap-16 sm:px-6 sm:pt-14 lg:px-10">
          <nav className="flex flex-col items-start gap-4 text-left">
            {menuLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-2xl font-light tracking-tight transition-colors hover:text-emerald-500 sm:text-3xl",
                  pathname === item.href
                    ? "text-background"
                    : "text-background/55"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {site.socialLinks.map((social) => {
              const Icon = socialIcons[social.service]

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-background/55 transition-colors hover:text-emerald-500"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              )
            })}
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {site.footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-medium text-background">
                  {group.title}
                </h2>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {group.links.map((link) => {
                    const external = link.href.startsWith("http")

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 text-sm text-background/55 transition-colors hover:text-emerald-500"
                      >
                        {link.label}
                        {external && (
                          <ArrowUpRightIcon
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-background/55">{site.copyright}</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
