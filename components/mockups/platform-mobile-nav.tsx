"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
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
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">
            <LivepeerLockup className="h-4 w-auto" aria-label="Livepeer" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-start overflow-y-auto px-3 pt-2">
          {platformNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-muted",
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
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
