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

const siteLinks = [
  { label: "Home", href: "/mockups/livepeer-org" },
  { label: "Ecosystem", href: "/mockups/livepeer-org/ecosystem" },
  { label: "GPU", href: "/mockups/livepeer-org/earn" },
  { label: "Livepeer Agent", href: "/mockups/livepeer-org/agent" },
  { label: "Agent Playbooks", href: "/mockups/livepeer-org/library" },
]

const footerGroups = [
  {
    title: "Network",
    links: [
      { label: "Ecosystem", href: "https://livepeer.org/ecosystem" },
      { label: "Livepeer Token", href: "https://livepeer.org/token" },
      { label: "Delegate LPT", href: "https://explorer.livepeer.org/" },
      { label: "Roadmap", href: "https://roadmap.livepeer.org/roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Research", href: "https://forum.livepeer.org/c/research/15" },
      { label: "Docs", href: "https://docs.livepeer.org/" },
      { label: "Blog", href: "https://blog.livepeer.org/" },
      { label: "Agent", href: "/mockups/livepeer-org/agent" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/livepeer" },
      { label: "X / Twitter", href: "https://x.com/Livepeer" },
      { label: "Forum", href: "https://forum.livepeer.org/" },
      { label: "GitHub", href: "https://github.com/livepeer" },
    ],
  },
]

const socials = [
  {
    label: "Livepeer on Discord",
    href: "https://discord.gg/livepeer",
    icon: DiscordIcon,
  },
  {
    label: "Livepeer on X",
    href: "https://x.com/Livepeer",
    icon: SocialXIcon,
  },
  {
    label: "Livepeer on GitHub",
    href: "https://github.com/livepeer",
    icon: GitHubIcon,
  },
  {
    label: "Livepeer website",
    href: "https://livepeer.org/",
    icon: GlobeIcon,
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

export function LivepeerOrgMenu() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

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
            {siteLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-2xl font-light tracking-tight transition-colors hover:text-emerald-500 sm:text-3xl",
                  pathname === item.href
                    ? "text-background underline underline-offset-8"
                    : "text-background/55"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon

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
            {footerGroups.map((group) => (
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

          <p className="text-xs text-background/55">
            © 2026 Livepeer Foundation. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
