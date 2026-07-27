import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

export function MarkdownDocument({
  title,
  summary,
  occurredAt,
  html,
}: {
  title: string
  summary?: string
  occurredAt?: string
  html: string
}) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          href="/marketing/planner"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Planner
        </Link>
        <header className="mt-10 border-b pb-8">
          <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {summary}
            </p>
          )}
          {occurredAt && (
            <time
              dateTime={occurredAt}
              className="mt-4 block text-sm text-muted-foreground"
            >
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(`${occurredAt}T00:00:00Z`))}
            </time>
          )}
        </header>
        <div
          className="planner-markdown mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  )
}
