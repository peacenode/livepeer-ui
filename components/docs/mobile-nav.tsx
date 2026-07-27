"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"

import {
  LivepeerGradientSymbol,
  LivepeerWordmark,
  RegistryUiMark,
} from "@/components/brand"
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
            <span
              className="flex items-center gap-1.5 text-foreground"
              aria-label="Livepeer UI"
            >
              <LivepeerGradientSymbol className="h-3 w-auto" />
              <LivepeerWordmark className="h-3 w-auto" />
            </span>
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
