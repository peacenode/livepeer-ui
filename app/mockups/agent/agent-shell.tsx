"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FolderIcon,
  Grid2X2Icon,
  PersonStandingIcon,
  PlusIcon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/mockups/agent", label: "Create", icon: PlusIcon },
  {
    href: "/mockups/agent/storyboards",
    label: "Storyboards",
    icon: Grid2X2Icon,
  },
  {
    href: "/mockups/agent/characters",
    label: "Characters",
    icon: PersonStandingIcon,
  },
  {
    href: "/mockups/agent/projects",
    label: "Projects",
    icon: FolderIcon,
  },
]

function isActiveRoute(href: string, pathname: string) {
  return href === "/mockups/agent"
    ? pathname === href
    : pathname.startsWith(href)
}

export function AgentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-dvh bg-background pb-16 md:pb-0 md:pl-14">
      <aside className="group/sidebar fixed inset-y-0 left-0 z-40 hidden w-14 flex-col overflow-hidden border-r bg-background transition-[width] duration-200 hover:w-44 md:flex">
        <Link
          href="/mockups/agent"
          aria-label="Livepeer create"
          className="flex h-14 w-44 shrink-0 items-center px-[18px]"
        >
          <LivepeerSymbol className="h-5 w-auto shrink-0" />
        </Link>

        <nav
          aria-label="Agent"
          className="flex flex-1 flex-col gap-1 px-2 py-2"
        >
          {navItems.map((item) => {
            const active = isActiveRoute(item.href, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-muted font-medium text-foreground"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="flex h-14 w-44 shrink-0 items-center gap-3 px-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="bg-foreground text-xs text-background">
              P
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
            Peace
          </span>
        </div>
      </aside>

      <div>{children}</div>

      <nav
        aria-label="Agent"
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-4 border-t bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        {navItems.map((item) => {
          const active = isActiveRoute(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground transition-colors",
                active && "font-medium text-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
