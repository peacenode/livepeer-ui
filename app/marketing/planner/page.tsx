import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon, FileClockIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { marketingWeeks } from "@/lib/marketing-plan"

export const metadata: Metadata = {
  title: "Marketing Planner",
  description: "Weekly Livepeer marketing outcomes and linked deliverables.",
}

export default function MarketingPlannerPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <nav className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Livepeer UI home"
            className="flex items-center"
          >
            <LivepeerLockup className="h-3.5 w-auto" />
          </Link>
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          <span className="text-sm font-medium">Marketing Planner</span>
          <div className="ml-auto hidden items-center gap-5 sm:flex">
            {marketingWeeks.map((week) => (
              <a
                key={week.week}
                href={`#week-${week.week}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Week {week.week}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8">
        <header className="grid gap-8 border-b py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm text-muted-foreground">
              July 27 – August 16, 2026
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.94] font-normal tracking-[-0.045em] text-balance">
              From mockup to production.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-pretty text-muted-foreground">
            Weekly outcomes mapped to the mockups and working materials that
            support them. Production links replace the pending state as files
            are approved.
          </p>
        </header>

        <div>
          {marketingWeeks.map((week) => (
            <section
              key={week.week}
              aria-labelledby={`week-${week.week}`}
              className="grid scroll-mt-6 gap-8 border-b py-12 last:border-b-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16 lg:py-16"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  Week {week.week}
                </p>
                <h2
                  id={`week-${week.week}`}
                  className="mt-1 text-xl font-medium"
                >
                  <time dateTime={week.startsAt}>{week.displayDate}</time>
                </h2>
                <Badge variant="outline" className="mt-3 font-normal">
                  Planned
                </Badge>
              </div>

              <div className="min-w-0">
                {week.outcome && (
                  <p className="mb-8 max-w-2xl text-xl leading-8 text-balance">
                    {week.outcome}
                  </p>
                )}

                <div className="flex flex-col gap-9">
                  {week.groups.map((group) => (
                    <div key={group.title}>
                      {group.title && (
                        <h3 className="mb-3 text-sm font-medium">
                          {group.title}
                        </h3>
                      )}
                      <div className="border-y">
                        {group.deliverables.map((deliverable, index) => (
                          <div key={deliverable.title}>
                            {index > 0 && <Separator />}
                            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                              <p className="max-w-xl text-sm leading-6">
                                {deliverable.title}
                              </p>
                              <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 sm:max-w-72 sm:justify-end">
                                {deliverable.links?.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {link.label}
                                    <ArrowUpRightIcon
                                      className="size-3.5"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                ))}
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/70">
                                  <FileClockIcon
                                    className="size-3.5"
                                    aria-hidden="true"
                                  />
                                  Production pending
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {week.note && (
                  <p className="mt-6 max-w-2xl text-xs leading-5 text-muted-foreground">
                    {week.note}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
