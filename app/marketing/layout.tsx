"use client"

import { usePathname } from "next/navigation"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SiteHeader } from "@/components/docs/site-header"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === "/marketing/planner") {
    return children
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4 md:px-8">
        <DocsSidebar />
        <main className="w-full min-w-0 flex-1 py-8 md:pl-10">{children}</main>
      </div>
    </div>
  )
}
