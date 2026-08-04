import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PlatformPageProps = {
  title: string
  showHeader?: boolean
  action?: ReactNode
  children: ReactNode
  description?: string
  variant?: "panel" | "plain"
}

export function PlatformPage({
  title,
  showHeader = true,
  action,
  children,
  description,
  variant = "plain",
}: PlatformPageProps) {
  const header = (
    <header className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
      <div>
        <h1 className="font-sans text-page-title text-balance">
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
    <section className="-mx-4 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-none px-4 pb-10 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:pt-6">
      <div
        className={cn(
          "mx-auto w-full max-w-screen-2xl",
          variant === "panel" && "overflow-hidden rounded-sm border"
        )}
      >
        <div
          className={cn(variant === "panel" && "border-b px-4 py-6 sm:px-6")}
        >
          {showHeader ? header : null}
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
