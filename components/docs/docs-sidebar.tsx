"use client"

import { useLayoutEffect, useRef } from "react"

import { DocsNav } from "@/components/docs/docs-nav"

const scrollPositionKey = "livepeer-ui:docs-sidebar-scroll"

export function DocsSidebar() {
  const sidebarRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const savedPosition = window.sessionStorage.getItem(scrollPositionKey)
    if (savedPosition) sidebar.scrollTop = Number(savedPosition)

    const savePosition = () => {
      window.sessionStorage.setItem(
        scrollPositionKey,
        String(sidebar.scrollTop)
      )
    }

    sidebar.addEventListener("scroll", savePosition, { passive: true })
    return () => {
      savePosition()
      sidebar.removeEventListener("scroll", savePosition)
    }
  }, [])

  return (
    <aside
      ref={sidebarRef}
      className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-6 md:block"
    >
      <DocsNav />
    </aside>
  )
}
