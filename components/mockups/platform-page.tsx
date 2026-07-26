import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PlatformPageProps = {
  title: string
  action?: ReactNode
  children: ReactNode
  description?: string
  variant?: "panel" | "plain"
}

export function PlatformPage({
  title,
  action,
  children,
  description,
  variant = "plain",
}: PlatformPageProps) {
  const header = (
    <header className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
      <div>
        <h1 className="font-sans text-[2rem] leading-[0.98] font-light tracking-[-0.025em] text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  )

  return (
    <section className="-mx-4 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 pb-10 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:pt-6">
      <div
        className={cn(
          variant === "panel" && "overflow-hidden rounded-sm border"
        )}
      >
        <div
          className={cn(
            variant === "panel" && "border-b px-4 py-6 sm:px-6"
          )}
        >
          {header}
        </div>
        <div
          className={cn(
            "flex flex-col gap-10",
            variant === "panel" ? "px-4 py-6 sm:px-6" : "pt-10"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
