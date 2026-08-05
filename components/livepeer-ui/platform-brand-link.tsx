import Link from "next/link"

import { LivepeerWordmark } from "@/components/brand"
import { cn } from "@/lib/utils"

export function PlatformBrandLink({
  ariaLabel,
  className,
  href,
}: {
  ariaLabel: string
  className?: string
  href: string
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn("inline-flex h-9 items-center", className)}
    >
      <span className="flex items-end gap-1.5 text-foreground">
        <LivepeerWordmark className="h-4 w-auto" />
        <span
          className="translate-y-[0.17em] font-agent text-sm leading-none font-medium tracking-tight"
          aria-hidden="true"
        >
          AGENT
        </span>
      </span>
    </Link>
  )
}
