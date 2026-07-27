import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { LivepeerOrgMenu } from "@/components/mockups/livepeer-org-menu"
import type { LivepeerOrgSite } from "@/sanity/lib/livepeer-org-pages"

export function LivepeerOrgHeader({ site }: { site: LivepeerOrgSite }) {
  return (
    <header className="relative z-20 w-full bg-transparent">
      <div className="flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
        <Link
          href={site.homeHref}
          className="flex shrink-0 items-center gap-3"
          aria-label="Livepeer.org home"
        >
          <span className="flex items-center gap-1.5 text-foreground">
            <LivepeerGradientSymbol className="h-3.5 w-auto sm:h-4" />
            <LivepeerWordmark className="h-3.5 w-auto sm:h-4" />
          </span>
        </Link>
        <LivepeerOrgMenu site={site} />
      </div>
    </header>
  )
}
