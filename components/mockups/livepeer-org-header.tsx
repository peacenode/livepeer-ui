import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { LivepeerOrgHeaderNav } from "@/components/mockups/livepeer-org-header-nav"
import { LivepeerOrgMenu } from "@/components/mockups/livepeer-org-menu"
import type { LivepeerOrgSite } from "@/components/mockups/contracts"
import { Button } from "@/components/ui/button"

export function LivepeerOrgHeader({
  site,
  consoleHref,
  playbooksHref,
  action,
  showMenu = true,
}: {
  site: LivepeerOrgSite
  consoleHref?: string
  playbooksHref?: string
  action?: {
    label: string
    href: string
  }
  showMenu?: boolean
}) {
  const useLivepeerHref =
    site.menuLinks.find(
      (link) => link.label === "Livepeer Agent" || link.href.includes("/agent")
    )?.href ?? `${site.homeHref}/agent`

  return (
    <header className="relative z-50 w-full bg-background">
      <div className="flex h-16 w-full items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-end gap-5">
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
          {showMenu && <LivepeerOrgHeaderNav site={site} />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {showMenu && (
            <Button
              nativeButton={false}
              render={<Link href={useLivepeerHref} />}
              className="hidden rounded-sm lg:inline-flex"
            >
              Use Livepeer
            </Button>
          )}
          {playbooksHref && (
            <Button
              variant="secondary"
              size="lg"
              nativeButton={false}
              render={<Link href={playbooksHref} />}
              className="h-12 rounded-sm px-4"
            >
              Playbooks
            </Button>
          )}
          {consoleHref && (
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={consoleHref} />}
              className="h-12 rounded-sm px-4"
            >
              Console
            </Button>
          )}
          {action && (
            <Button
              variant="link"
              nativeButton={false}
              render={<Link href={action.href} />}
              className="px-2 font-medium"
            >
              {action.label} →
            </Button>
          )}
          {showMenu && (
            <div className="lg:hidden">
              <LivepeerOrgMenu site={site} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
