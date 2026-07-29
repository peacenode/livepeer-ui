import type { Metadata } from "next"

import { PrivateBetaRenderShell } from "@/components/mockups/private-beta-render-shell"

export const metadata: Metadata = {
  title: {
    default: "Render Result",
    template: "%s - Livepeer Agent Private Beta",
  },
}

export default function PrivateBetaRenderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PrivateBetaRenderShell>{children}</PrivateBetaRenderShell>
}
