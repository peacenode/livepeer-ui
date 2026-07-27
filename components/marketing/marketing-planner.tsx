import Link from "next/link"
import { ArrowUpRightIcon, FileTextIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type {
  MarketingPlanItem,
  MarketingWeek,
  MarketingWeekDocument,
} from "@/sanity/lib/marketing-plan"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
})

const displayDate = (date: string) =>
  dateFormatter.format(new Date(`${date}T00:00:00Z`))

function PlannerItem({ item }: { item: MarketingPlanItem }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-md bg-muted p-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm leading-6 font-medium">
          {item.title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>
      {item.links?.length ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {item.links.map((link) => (
            <Link
              key={link._key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <ArrowUpRightIcon className="size-3" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function PlannerItems({ items }: { items: MarketingPlanItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No entries yet.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <PlannerItem key={item._key} item={item} />
      ))}
    </div>
  )
}

function PlannerDocuments({
  documents,
  kind,
}: {
  documents: MarketingWeekDocument[]
  kind: "internal-meeting" | "user-interview"
}) {
  if (documents.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No documents added yet.</p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((document) => (
        <Link
          key={document._id}
          href={`/marketing/planner/${kind}/${document.slug}`}
          className="group flex min-w-0 items-start gap-3 rounded-md bg-muted p-4"
        >
          <FileTextIcon
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block text-sm leading-6 font-medium group-hover:underline">
              {document.title}
            </span>
            {document.summary ? (
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {document.summary}
              </span>
            ) : null}
          </span>
        </Link>
      ))}
    </div>
  )
}

export function MarketingWeeks({ weeks }: { weeks: MarketingWeek[] }) {
  if (weeks.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground">No weeks added yet.</p>
    )
  }

  return (
    <Accordion className="overflow-visible rounded-none border-0 [&_[data-slot=accordion-content]]:px-0">
      {weeks.map((week) => (
        <AccordionItem
          key={week._id}
          value={week.startsAt}
          className="relative border-0 not-last:border-b-0 after:absolute after:bottom-0 after:left-1/2 after:w-screen after:-translate-x-1/2 after:border-b after:border-border data-open:bg-transparent"
        >
          <AccordionTrigger className="items-center px-0 py-6 font-sans text-base font-semibold hover:no-underline">
            <time dateTime={week.startsAt}>{displayDate(week.startsAt)}</time>
          </AccordionTrigger>
          <AccordionContent className="pb-10">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-12 gap-y-10">
              <section>
                <h3 className="mb-5 font-sans text-sm font-medium text-muted-foreground">
                  Outcomes
                </h3>
                <PlannerItems items={week.outcomes} />
              </section>
              <section>
                <h3 className="mb-5 font-sans text-sm font-medium text-muted-foreground">
                  Constraints
                </h3>
                <PlannerItems items={week.constraints} />
              </section>
              <section>
                <h3 className="mb-5 font-sans text-sm font-medium text-muted-foreground">
                  Internal meetings
                </h3>
                <PlannerDocuments
                  documents={week.internalMeetings}
                  kind="internal-meeting"
                />
              </section>
              <section>
                <h3 className="mb-5 font-sans text-sm font-medium text-muted-foreground">
                  User interviews
                </h3>
                <PlannerDocuments
                  documents={week.userInterviews}
                  kind="user-interview"
                />
              </section>
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
  )
}

export function MarketingPlanner({ weeks }: { weeks: MarketingWeek[] }) {
  return (
    <main className="min-h-svh overflow-x-clip bg-background font-sans text-foreground">
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
        <div className="px-5 sm:px-8">
          <MarketingWeeks weeks={weeks} />
        </div>
      </div>
    </main>
  )
}
