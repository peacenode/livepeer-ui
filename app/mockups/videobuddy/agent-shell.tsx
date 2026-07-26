"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ApertureIcon,
  ArrowDownToLineIcon,
  BadgeInfoIcon,
  FilmIcon,
  FolderIcon,
  Grid2X2Icon,
  SettingsIcon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/mockups/agent",
    label: "Create",
    icon: LivepeerSymbol,
    brand: true,
  },
  {
    href: "/mockups/agent/storyboards",
    label: "Storyboards",
    icon: Grid2X2Icon,
    brand: false,
  },
  {
    href: "/mockups/agent/characters",
    label: "Characters",
    icon: ApertureIcon,
    brand: false,
  },
  {
    href: "/mockups/agent/footage",
    label: "Clips",
    icon: FilmIcon,
    brand: false,
  },
  {
    href: "/mockups/agent/projects",
    label: "Projects",
    icon: FolderIcon,
    brand: false,
  },
]

function isActiveRoute(href: string, pathname: string) {
  return href === "/mockups/agent"
    ? pathname === href
    : pathname.startsWith(href)
}

export function AgentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-h-dvh bg-background pb-16 md:pb-0 md:pl-14">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-14 flex-col overflow-hidden bg-background transition-[width] duration-200 md:flex",
          expanded && "w-44"
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <nav
          aria-label="Livepeer Agent"
          className="flex flex-1 flex-col gap-1 px-2 py-2"
        >
          {navItems.map((item) => {
            const active = isActiveRoute(item.href, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                onClick={() => setExpanded(false)}
                className={cn(
                  "flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  expanded && active && "bg-muted font-medium text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground transition-colors",
                    active && !expanded && "bg-muted"
                  )}
                >
                  <item.icon
                    className={cn(
                      "shrink-0",
                      item.brand ? "h-[18px] w-auto" : "size-6"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "truncate opacity-0 transition-opacity duration-150",
                    expanded && "opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
          <Link
            href="/mockups/agent/install"
            data-active={pathname.startsWith("/mockups/agent/install")}
            onClick={() => setExpanded(false)}
            className={cn(
              "flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              expanded &&
                pathname.startsWith("/mockups/agent/install") &&
                "bg-muted font-medium text-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground",
                pathname.startsWith("/mockups/agent/install") &&
                  !expanded &&
                  "bg-muted"
              )}
            >
              <ArrowDownToLineIcon className="size-6" />
            </span>
            <span
              className={cn(
                "truncate opacity-0 transition-opacity duration-150",
                expanded && "opacity-100"
              )}
            >
              Install
            </span>
          </Link>
        </nav>

        <Link
          href="/mockups/agent/protocol"
          data-active={pathname.startsWith("/mockups/agent/protocol")}
          onClick={() => setExpanded(false)}
          className={cn(
            "mx-2 flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            expanded &&
              pathname.startsWith("/mockups/agent/protocol") &&
              "bg-muted font-medium text-foreground"
          )}
        >
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground",
              pathname.startsWith("/mockups/agent/protocol") &&
                !expanded &&
                "bg-muted"
            )}
          >
            <BadgeInfoIcon className="size-6" />
          </span>
          <span
            className={cn(
              "truncate opacity-0 transition-opacity duration-150",
              expanded && "opacity-100"
            )}
          >
            Protocol
          </span>
        </Link>

        <button
          type="button"
          className="mx-2 flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground">
            <SettingsIcon className="size-6" />
          </span>
          <span
            className={cn(
              "truncate opacity-0 transition-opacity duration-150",
              expanded && "opacity-100"
            )}
          >
            Settings
          </span>
        </button>

        <div className="flex h-14 w-44 shrink-0 items-center gap-3 px-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="bg-foreground text-xs text-background">
              P
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "truncate text-sm opacity-0 transition-opacity duration-150",
              expanded && "opacity-100"
            )}
          >
            Peace
          </span>
        </div>
      </aside>

      <div>{children}</div>

      <nav
        aria-label="Livepeer Agent"
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t bg-background/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        {navItems.map((item) => {
          const active = isActiveRoute(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mx-1 my-1 flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] text-muted-foreground transition-colors",
                active && "bg-muted font-medium text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "text-foreground",
                  item.brand ? "h-[18px] w-auto" : "size-6"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
