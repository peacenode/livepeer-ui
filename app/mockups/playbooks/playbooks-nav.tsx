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
              "rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              active && "bg-muted font-medium text-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
