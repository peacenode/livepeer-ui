"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDownToLineIcon, BadgeInfoIcon, SettingsIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { clientNavigationItems, isClientRouteActive } from "./client-navigation-items"

export function ClientApplicationSidebar({ pathname }: { pathname: string }) {
  const [expanded, setExpanded] = useState(false)
  const link = (
    href: string,
    label: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    brand = false
  ) => {
    const active = isClientRouteActive(href, pathname)
    return (
      <Link href={href} key={href} onClick={() => setExpanded(false)} className={cn("flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", expanded && active && "bg-muted font-medium text-foreground")}>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground", active && !expanded && "bg-muted")}>
          <Icon className={cn("shrink-0", brand ? "h-[18px] w-auto" : "size-6")} />
        </span>
        <span className={cn("truncate opacity-0 transition-opacity duration-150", expanded && "opacity-100")}>{label}</span>
      </Link>
    )
  }
  return (
    <aside className={cn("flex h-full w-14 flex-col overflow-hidden bg-background transition-[width] duration-200", expanded && "w-44")} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <nav aria-label="Livepeer Agent" className="flex flex-1 flex-col gap-1 px-2 py-2">
        {clientNavigationItems.map((item) => link(item.href, item.label, item.icon, item.brand))}
        {link("/mockups/client/install", "Install", ArrowDownToLineIcon)}
      </nav>
      <div className="px-2">{link("/mockups/client/protocol", "Protocol", BadgeInfoIcon)}</div>
      <button type="button" className="mx-2 flex h-10 w-40 shrink-0 items-center gap-3 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground"><SettingsIcon className="size-6" /></span>
        <span className={cn("truncate opacity-0 transition-opacity duration-150", expanded && "opacity-100")}>Settings</span>
      </button>
      <div className="flex h-14 w-44 shrink-0 items-center gap-3 px-3">
        <Avatar className="size-8 shrink-0"><AvatarFallback className="bg-foreground text-xs text-background">P</AvatarFallback></Avatar>
        <span className={cn("truncate text-sm opacity-0 transition-opacity duration-150", expanded && "opacity-100")}>Peace</span>
      </div>
    </aside>
  )
}
