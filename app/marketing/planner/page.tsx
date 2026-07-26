import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon, FileClockIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Livepeer UI home"
            className="flex items-center"
          >
            <LivepeerLockup className="h-3.5 w-auto" />
          </Link>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <Accordion className="rounded-lg">
          {marketingWeeks.map((week) => (
            <AccordionItem
              key={week.week}
              value={week.startsAt}
              className="data-open:bg-transparent"
            >
              <AccordionTrigger className="items-center px-5 py-5 text-base hover:no-underline sm:px-6">
                <time dateTime={week.startsAt}>{week.displayDate}</time>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-2 sm:px-2">
                <div className="flex flex-col gap-8">
                  {week.groups.map((group) => (
                    <section key={group.title}>
                      {group.title && (
                        <h2 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                          {group.title}
                        </h2>
                      )}
                      <div>
                        {group.deliverables.map((deliverable, index) => (
                          <div key={deliverable.title}>
                            {index > 0 && <Separator />}
                            <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
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
                    </section>
                  ))}
                </div>

                {week.note && (
                  <p className="mt-8 max-w-2xl px-4 text-xs leading-5 text-muted-foreground">
                    {week.note}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  )
}
