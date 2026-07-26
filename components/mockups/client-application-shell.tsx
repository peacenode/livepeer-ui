"use client"

import { usePathname } from "next/navigation"

import { ClientApplicationSidebar } from "./client-application-sidebar"
import { ClientMobileBottomNavigation } from "./client-mobile-bottom-navigation"
import { cn } from "@/lib/utils"

export function ClientApplicationShell({
  children,
  contained = false,
}: {
  children: React.ReactNode
  contained?: boolean
}) {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        "bg-background pb-16 md:pb-0 md:pl-14",
        contained ? "relative h-full min-h-0" : "min-h-dvh"
      )}
    >
      <div
        className={cn(
          "inset-y-0 left-0 z-40 hidden md:block",
          contained ? "absolute" : "fixed"
        )}
      >
        <ClientApplicationSidebar pathname={pathname} />
      </div>
      <div>{children}</div>
      <div
        className={cn(
          "inset-x-0 bottom-0 z-40 md:hidden",
          contained ? "absolute" : "fixed"
        )}
      >
        <ClientMobileBottomNavigation pathname={pathname} />
      </div>
    </div>
  )
}
