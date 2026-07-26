"use client"

import { usePathname } from "next/navigation"

import { DocsNav } from "@/components/docs/docs-nav"
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
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-6 md:block">
          <DocsNav />
        </aside>
        <main className="w-full min-w-0 flex-1 py-8 md:pl-10">{children}</main>
      </div>
    </div>
  )
}
