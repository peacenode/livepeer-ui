import Link from "next/link"
import { ArrowUpRightIcon, FileTextIcon } from "lucide-react"

import { LivepeerLockup } from "@/components/brand"
import type {
  PlannerDocumentSummary,
  PlannerReference,
} from "@/sanity/lib/planner-content"

const sections = [
  { id: "outreach", label: "Outreach" },
  { id: "constraints", label: "Constraints" },
  { id: "internal-meetings", label: "Internal meetings" },
  { id: "user-interviews", label: "User interviews" },
] as const

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
})

function PlannerHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Livepeer UI home">
          <LivepeerLockup className="h-3.5 w-auto" />
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function ReferenceList({
  id,
  title,
  items,
}: {
  id: string
  title: string
  items: PlannerReference[]
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t pt-8">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="mt-5 divide-y">
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
    </section>
  )
}

function DocumentList({
  id,
  title,
  kind,
  documents,
}: {
  id: string
  title: string
  kind: "internal-meeting" | "user-interview"
  documents: PlannerDocumentSummary[]
}) {
  const items = documents.filter((document) => document.kind === kind)

  return (
    <section id={id} className="scroll-mt-6 border-t pt-8">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="mt-5 divide-y">
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
    </section>
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
        <div className="mt-10 grid gap-12">
          <ReferenceList id="outreach" title="Outreach" items={outreach} />
          <ReferenceList
            id="constraints"
            title="Constraints"
            items={constraints}
          />
          <DocumentList
            id="internal-meetings"
            title="Internal meetings"
            kind="internal-meeting"
            documents={documents}
          />
          <DocumentList
            id="user-interviews"
            title="User interviews"
            kind="user-interview"
            documents={documents}
          />
        </div>
      </div>
    </main>
  )
}
