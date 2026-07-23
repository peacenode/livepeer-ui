"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import { GlobalSearch } from "@/components/mockups/global-search"
import { platformNavItems } from "@/components/mockups/platform-sidebar"
import { UserMenu } from "@/components/mockups/user-menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function PlatformMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="md:hidden" />
        }
      >
        <MenuIcon strokeWidth={2.5} />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">
            <LivepeerLockup className="h-4 w-auto" aria-label="Livepeer" />
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          <GlobalSearch shortcut={false} />
        </div>
        <nav className="flex flex-col items-start gap-1 overflow-y-auto px-3">
          {platformNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3 py-3">
          <UserMenu />
        </div>
      </SheetContent>
    </Sheet>
  )
}
