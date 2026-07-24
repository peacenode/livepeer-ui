"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BoxesIcon,
  ClapperboardIcon,
  ImagesIcon,
  UsersIcon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/mockups/agent", label: "Create", icon: ImagesIcon },
  {
    href: "/mockups/agent/storyboards",
    label: "Storyboards",
    icon: ClapperboardIcon,
  },
  {
    href: "/mockups/agent/characters",
    label: "Characters",
    icon: UsersIcon,
  },
  { href: "/mockups/agent/projects", label: "Projects", icon: BoxesIcon },
]

export function AgentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1480px] items-center gap-3 px-4 sm:px-6">
          <Link
            href="/mockups/agent"
            aria-label="Livepeer create"
            className="flex size-8 shrink-0 items-center justify-center"
          >
            <LivepeerSymbol className="h-5 w-auto" />
          </Link>
          <nav
            aria-label="Agent"
            className="flex min-w-0 flex-1 scrollbar-none items-center gap-1 overflow-x-auto"
          >
            {navItems.map((item) => {
              const active =
                item.href === "/mockups/agent"
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    "flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    active && "bg-muted font-medium text-foreground"
                  )}
                >
                  <item.icon className="size-3.5 sm:hidden" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="bg-foreground text-xs text-background">
              P
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      {children}
    </div>
  )
}
