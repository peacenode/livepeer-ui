import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
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
        <div className="flex items-center gap-1 sm:gap-2">
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
          {showMenu && <LivepeerOrgMenu site={site} />}
        </div>
      </div>
    </header>
  )
}
