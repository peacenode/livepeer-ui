import type { Metadata } from "next"

import { PrivateBetaConsoleShell } from "@/components/mockups/private-beta-console-shell"

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s - Livepeer Agent Private Beta",
  },
}

export default async function PrivateBetaConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PrivateBetaConsoleShell>{children}</PrivateBetaConsoleShell>
}
