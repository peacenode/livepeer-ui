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
  PlannerDocumentSummary,
  PlannerReference,
} from "@/sanity/lib/planner-content"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
})

function PlannerHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Livepeer UI home">
          <LivepeerLockup className="h-3.5 w-auto" />
        </Link>
      </div>
    </header>
  )
}

function ReferenceList({ items }: { items: PlannerReference[] }) {
  return (
    <div className="divide-y">
      {items.map((item) => (
        <article key={item._id} className="py-5 first:pt-0">
          <h3 className="font-medium">{item.title}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
          {item.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {item.links.map((link) => (
                <Link
                  key={link._key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
                >
                  {link.label}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </article>
      ))}
      {items.length === 0 && (
        <p className="py-5 text-sm text-muted-foreground">No entries yet.</p>
      )}
    </div>
  )
}

function DocumentList({
  kind,
  documents,
}: {
  kind: "internal-meeting" | "user-interview"
  documents: PlannerDocumentSummary[]
}) {
  const items = documents.filter((document) => document.kind === kind)

  return (
    <div className="divide-y">
      {items.map((document) => (
        <Link
          key={document._id}
          href={`/marketing/planner/${kind}/${document.slug}`}
          className="group flex items-start gap-3 py-5 first:pt-0"
        >
          <FileTextIcon
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block font-medium group-hover:underline">
              {document.title}
            </span>
            {document.summary && (
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {document.summary}
              </span>
            )}
            {document.occurredAt && (
              <time
                dateTime={document.occurredAt}
                className="mt-2 block text-xs text-muted-foreground"
              >
                {dateFormatter.format(
                  new Date(`${document.occurredAt}T00:00:00Z`)
                )}
              </time>
            )}
          </span>
        </Link>
      ))}
      {items.length === 0 && (
        <p className="py-5 text-sm text-muted-foreground">
          No documents uploaded yet.
        </p>
      )}
    </div>
  )
}

export function PlannerContent({
  outreach,
  constraints,
  documents,
}: {
  outreach: PlannerReference[]
  constraints: PlannerReference[]
  documents: PlannerDocumentSummary[]
}) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <PlannerHeader />
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="text-3xl font-medium tracking-tight">Planner</h1>
        <Accordion className="mt-8">
          <AccordionItem value="outreach">
            <AccordionTrigger className="px-5 py-5 text-base">
              Outreach
            </AccordionTrigger>
            <AccordionContent className="px-1 sm:px-3">
              <ReferenceList items={outreach} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="constraints">
            <AccordionTrigger className="px-5 py-5 text-base">
              Constraints
            </AccordionTrigger>
            <AccordionContent className="px-1 sm:px-3">
              <ReferenceList items={constraints} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="internal-meetings">
            <AccordionTrigger className="px-5 py-5 text-base">
              Internal meetings
            </AccordionTrigger>
            <AccordionContent className="px-1 sm:px-3">
              <DocumentList kind="internal-meeting" documents={documents} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="user-interviews">
            <AccordionTrigger className="px-5 py-5 text-base">
              User interviews
            </AccordionTrigger>
            <AccordionContent className="px-1 sm:px-3">
              <DocumentList kind="user-interview" documents={documents} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}
