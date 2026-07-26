import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { marketingWeeks } from "@/lib/marketing-plan"

export const metadata: Metadata = {
  title: "Marketing Planner",
  description: "Weekly Livepeer marketing outcomes and linked deliverables.",
}

export default function MarketingPlannerPage() {
  return (
    <main className="min-h-svh bg-background font-sans text-foreground">
      <nav className="border-b">
        <div className="flex h-16 w-full items-center px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Livepeer UI home"
            className="flex items-center"
          >
            <LivepeerLockup className="h-3.5 w-auto" />
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              UI Registry
            </Link>
            <Link
              href="/design.md"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              design.md
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <Accordion className="overflow-visible rounded-none border-0 [&_[data-slot=accordion-content]]:px-0">
          {marketingWeeks.map((week) => (
            <AccordionItem
              key={week.week}
              value={week.startsAt}
              className="border-b data-open:bg-transparent"
            >
              <AccordionTrigger className="items-center px-5 py-6 font-sans text-base font-normal hover:no-underline sm:px-8">
                <time dateTime={week.startsAt}>{week.displayDate}</time>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-10 sm:px-8">
                <div className="flex flex-col gap-10">
                  {week.groups.map((group) => (
                    <section
                      key={group.title}
                      className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
                    >
                      {group.title && (
                        <h2 className="font-sans text-sm font-medium text-muted-foreground">
                          {group.title}
                        </h2>
                      )}
                      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
                        {group.deliverables.map((deliverable) => (
                          <div
                            key={deliverable.title}
                            className="flex min-w-0 flex-col gap-1"
                          >
                            <p className="text-sm leading-6">
                              {deliverable.title}
                            </p>
                            {deliverable.links?.length ? (
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                {deliverable.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {link.label}
                                    <ArrowUpRightIcon
                                      className="size-3"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {week.note && (
                  <p className="mt-8 text-xs leading-5 text-muted-foreground">
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
