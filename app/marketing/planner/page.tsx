import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon, FileClockIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { marketingWeeks } from "@/lib/marketing-plan"

export const metadata: Metadata = {
  title: "Marketing Planner",
  description: "Weekly Livepeer marketing outcomes and linked deliverables.",
}

export default function MarketingPlannerPage() {
  return (
    <div className="mx-auto w-full max-w-5xl pb-20">
      <header className="max-w-3xl border-b pb-10">
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Marketing Planner
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">
          Weekly outcomes mapped to the mockups and working materials that
          support them. Production links will replace the pending state as files
          are approved.
        </p>
      </header>

      <div>
        {marketingWeeks.map((week) => (
          <section
            key={week.week}
            aria-labelledby={`week-${week.week}`}
            className="grid gap-8 border-b py-10 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12"
          >
            <div>
              <p className="text-sm text-muted-foreground">Week {week.week}</p>
              <h2 id={`week-${week.week}`} className="mt-1 text-xl font-medium">
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
  )
}
