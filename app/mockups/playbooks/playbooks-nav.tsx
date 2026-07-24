"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const items = [
  { label: "Playbooks", href: "/mockups/playbooks" },
  { label: "Install", href: "/mockups/playbooks/install" },
]

export function PlaybooksNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 text-sm">
      <div className="flex items-center gap-1">
        {items.map((item) => {
          const active =
            item.href === "/mockups/playbooks"
              ? pathname === item.href
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3",
                active && "bg-muted font-medium text-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
        <a
          href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
        >
          Provide GPUs
        </a>
        <a
          href="https://docs.livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
        >
          Docs
        </a>
      </div>
      <a
        href="https://discord.gg/livepeer"
        target="_blank"
        rel="noreferrer"
        className="rounded-md bg-foreground px-2.5 py-2 font-medium text-background transition-colors hover:bg-foreground/80 sm:px-3"
      >
        Discord
      </a>
    </nav>
  )
}
