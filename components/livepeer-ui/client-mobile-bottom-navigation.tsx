import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  clientNavigationItems,
  isClientRouteActive,
} from "./client-navigation-items"

export function ClientMobileBottomNavigation({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Livepeer Agent" className="grid h-16 grid-cols-5 border-t bg-background/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {clientNavigationItems.map((item) => {
        const active = isClientRouteActive(item.href, pathname)
        return (
          <Link key={item.href} href={item.href} className={cn("mx-1 my-1 flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] text-muted-foreground transition-colors", active && "bg-muted font-medium text-foreground")}>
            <item.icon className={cn("text-foreground", item.brand ? "h-[18px] w-auto" : "size-6")} />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
