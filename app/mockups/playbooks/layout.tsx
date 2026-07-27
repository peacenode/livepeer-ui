import type { Metadata } from "next"
import { LivepeerOrgFooter } from "@/components/mockups/livepeer-org-footer"
import { LivepeerOrgHeader } from "@/components/mockups/livepeer-org-header"

export const metadata: Metadata = {
  title: {
    default: "Livepeer",
    template: "%s - Livepeer",
  },
}

export default function PlaybooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="absolute inset-x-0 top-0 z-20">
        <LivepeerOrgHeader />
      </div>
      <div className="flex-1">{children}</div>
      <LivepeerOrgFooter />
    </div>
  )
}
