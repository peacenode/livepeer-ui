"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"

import { LivepeerLockup, RegistryUiMark } from "@/components/brand"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocsNav } from "@/components/docs/docs-nav"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-sm" className="md:hidden" />}
      >
        <MenuIcon strokeWidth={2.5} />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left">
            <LivepeerLockup className="h-3 w-auto" aria-label="Livepeer UI" />
            <RegistryUiMark
              className="h-2 w-auto self-end"
              aria-hidden="true"
            />
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-4 pb-8">
          <DocsNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
