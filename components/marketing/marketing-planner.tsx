import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { MarketingWeek } from "@/sanity/lib/marketing-plan"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
})

const displayDate = (date: string) =>
  dateFormatter.format(new Date(`${date}T00:00:00Z`))

export function MarketingPlanner({ weeks }: { weeks: MarketingWeek[] }) {
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
        </div>
      </nav>

      <div className="w-full">
        <Accordion className="overflow-visible rounded-none border-0 [&_[data-slot=accordion-content]]:px-0">
          {weeks.map((week) => (
            <AccordionItem
              key={week._id}
              value={week.startsAt}
              className="border-b data-open:bg-transparent"
            >
              <AccordionTrigger className="items-center px-5 py-6 font-sans text-base font-semibold hover:no-underline sm:px-8">
                <time dateTime={week.startsAt}>
                  {displayDate(week.startsAt)}
                </time>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-10 sm:px-8">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-12 gap-y-10">
                  {week.groups.map((group) => (
                    <section key={group._key}>
                      {group.title && (
                        <h2 className="mb-5 font-sans text-sm font-medium text-muted-foreground">
                          {group.title}
                        </h2>
                      )}
                      <div className="flex flex-col gap-6">
                        {group.deliverables.map((deliverable) => (
                          <div
                            key={deliverable._key}
                            className="flex min-w-0 flex-col gap-1 rounded-md bg-muted p-4"
                          >
                            <p className="text-sm leading-6">
                              {deliverable.title}
                            </p>
                            {deliverable.links?.length ? (
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                {deliverable.links.map((link) => (
                                  <Link
                                    key={link._key}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
