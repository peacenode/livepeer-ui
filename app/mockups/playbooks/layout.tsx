import type { Metadata } from "next"
import { LivepeerOrgFooter } from "@/components/mockups/livepeer-org-footer"
import { LivepeerOrgHeader } from "@/components/mockups/livepeer-org-header"
import { getLivepeerOrgNavigationImages } from "@/sanity/lib/livepeer-org-navigation"
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
  const [site, navigationImages] = await Promise.all([
    getLivepeerOrgSite(),
    getLivepeerOrgNavigationImages(),
  ])
  return (
    <div
      data-livepeer-org-shell
      className="flex min-h-dvh flex-col overflow-x-clip overscroll-none bg-background"
    >
      <div className="sticky inset-x-0 top-0 z-[80] -mb-16">
        <LivepeerOrgHeader site={site} navigationImages={navigationImages} />
      </div>
      <div className="flex-1">{children}</div>
      <LivepeerOrgFooter site={site} />
    </div>
  )
}
