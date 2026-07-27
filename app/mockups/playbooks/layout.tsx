import type { Metadata } from "next"
import { LivepeerOrgFooter } from "@/components/mockups/livepeer-org-footer"
import { LivepeerOrgHeader } from "@/components/mockups/livepeer-org-header"
import { getLivepeerOrgSite } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: {
    default: "Livepeer",
    template: "%s - Livepeer",
  },
}

export default async function PlaybooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const site = await getLivepeerOrgSite()
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="absolute inset-x-0 top-0 z-20">
        <LivepeerOrgHeader site={site} />
      </div>
      <div className="flex-1">{children}</div>
      <LivepeerOrgFooter site={site} />
    </div>
  )
}
