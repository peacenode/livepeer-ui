"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { DiscordIcon, GitHubIcon } from "@/components/brand-social-icons"
import { cn } from "@/lib/utils"

const items = [
  { label: "Playbooks", href: "/mockups/playbooks/library" },
  { label: "Earn with GPU", href: "/mockups/playbooks/earn" },
]

export function PlaybooksNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 text-sm">
      <a
        href="https://github.com/livepeer"
        target="_blank"
        rel="noreferrer"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-black"
        aria-label="Livepeer on GitHub"
        title="GitHub"
      >
        <GitHubIcon className="size-4" />
      </a>
      <a
        href="https://discord.gg/livepeer"
        target="_blank"
        rel="noreferrer"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-black"
        aria-label="Join Livepeer on Discord"
        title="Discord"
      >
        <DiscordIcon className="size-4" />
      </a>
      <div className="flex items-center gap-1">
        {items.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground sm:px-3",
                active && "bg-foreground/5 font-medium text-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:flex"
        >
          Docs
          <span className="font-sans" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          href="/mockups/platform/api"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:flex"
        >
          API Console
          <span className="font-sans" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </nav>
  )
}
