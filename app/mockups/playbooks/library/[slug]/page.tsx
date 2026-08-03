import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { StarIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { LivepeerSymbol } from "@/components/brand"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getPlaybookDocument, getSourcePlaybooks } from "../../daydream-source"
import { InstallAgentFooter } from "../../install-agent-footer"
import { PlaybookBriefForm } from "../../playbook-brief-form"

type PageProps = {
  params: Promise<{ slug: string }>
}

function ReliabilityStars({ value }: { value: string }) {
  const score = Math.min(5, Math.max(0, Number.parseFloat(value) || 0))

  return (
    <div
      className="mt-2 flex gap-1"
      aria-label={`${score} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(1, Math.max(0, score - index)) * 100

        return (
          <span key={index} className="relative size-3.5 text-foreground">
            <StarIcon className="size-3.5" strokeWidth={12 / 7} />
            <span
              className="absolute inset-0 overflow-hidden text-foreground"
              style={{ width: `${fill}%` }}
            >
              <StarIcon
                className="size-3.5 fill-current"
                strokeWidth={12 / 7}
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const playbook = await getPlaybookDocument(slug)
  return { title: playbook?.title ?? "Playbook" }
}

export async function SourcePlaybookView({
  catalogHref,
  embedded = false,
  slug,
}: {
  catalogHref: string
  embedded?: boolean
  slug: string
}) {
  const [playbook, catalog] = await Promise.all([
    getPlaybookDocument(slug),
    getSourcePlaybooks(),
  ])
  if (!playbook) notFound()
  const catalogEntry = catalog.find((item) => item.slug === slug)
  const intro = playbook.intro.replace(
    /^Paste this whole file.*?(?:Claude cowork, chat, or Code|agent)\.\s*/i,
    ""
  )

  const meta = [
    { label: playbook.durationLabel ?? "Time", value: playbook.duration },
    { label: "Budget", value: playbook.budget },
    { label: "Reliability", value: playbook.reliability },
  ].filter((item) => item.value)

  return (
    <div
      className={
        embedded
          ? "min-h-0 flex-1 overflow-y-auto overscroll-contain"
          : undefined
      }
    >
      <div
        className={
          embedded
            ? "mx-auto max-w-4xl py-6"
            : "mx-auto max-w-4xl px-4 pt-24 pb-4 sm:px-6 sm:pt-28"
        }
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href={catalogHref} />}
              >
                Playbooks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="max-w-64 truncate sm:max-w-md">
                {playbook.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-10 max-w-4xl">
          <h1 className="text-3xl leading-tight font-light tracking-tight text-balance sm:text-5xl">
            {playbook.title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
              {intro}
            </p>
          )}
          {playbook.caps.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-1.5">
                {playbook.caps.map((cap) => (
                  <Badge
                    key={cap}
                    variant="secondary"
                    className="max-w-40 truncate rounded-sm"
                    title={cap}
                  >
                    {cap}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {catalogEntry && (
          <section className="mt-12">
            <div className="grid overflow-hidden rounded-sm bg-muted md:grid-cols-[1.1fr_0.9fr]">
              {catalogEntry.image && (
                <div
                  className="min-h-72 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${catalogEntry.image}")`,
                  }}
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="mb-5 text-base leading-snug font-medium">
                  Output
                </p>
                {catalogEntry.deliverables.length > 0 ? (
                  <div className="divide-y">
                    {catalogEntry.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <LivepeerSymbol
                          className="h-2 w-auto shrink-0 text-foreground"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The completed media and project files described in this
                    playbook.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {meta.map((item) => {
            const values = item.value?.split(/\s*·\s*/).filter(Boolean)

            return (
              <div key={item.label} className="py-2">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <div
                  className={
                    item.label === "Budget"
                      ? "mt-3 space-y-0 text-lg leading-tight font-medium tabular-nums"
                      : "mt-3 space-y-0 text-base leading-tight font-medium tabular-nums"
                  }
                >
                  {values?.map((value) => {
                    const isReliability = item.label === "Reliability"

                    if (isReliability) {
                      return (
                        <div key={value}>
                          <p>{value}</p>
                          <ReliabilityStars value={value} />
                        </div>
                      )
                    }

                    return <p key={value}>{value}</p>
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12">
          <PlaybookBriefForm
            brief={playbook.brief}
            markdown={playbook.markdown}
          />
        </div>
      </div>
      {!embedded && <InstallAgentFooter />}
    </div>
  )
}

export default function RemovedLivepeerOrgPlaybookPage() {
  notFound()
}

export async function generateStaticParams() {
  const playbooks = await getSourcePlaybooks()
  return playbooks.map(({ slug }) => ({ slug }))
}
