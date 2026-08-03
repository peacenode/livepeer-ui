"use client"

import { usePathname } from "next/navigation"

import { RegistryShell } from "@/components/docs/registry-shell"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === "/marketing/planner") {
    return children
  }

  return <RegistryShell>{children}</RegistryShell>
}
