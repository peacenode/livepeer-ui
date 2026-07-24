import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getPlaybookDocument, getSourcePlaybooks } from "../../daydream-source"
import { InstallRunnerFooter } from "../../install-runner-footer"
import { PlaybookBriefForm } from "../../playbook-brief-form"

type PageProps = {
  params: Promise<{ slug: string }>
}

function inline(value: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*.*?\*\*|`.*?`|\[[^\]]+\]\([^)]+\))/g
  let cursor = 0

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > cursor) nodes.push(value.slice(cursor, index))
    const token = match[0]

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={index} className="font-medium text-foreground">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={index}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        nodes.push(
          <a
            key={index}
            href={
              link[2].startsWith("/")
                ? `https://storyboard.daydream.monster${link[2]}`
                : link[2]
            }
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            {link[1]}
          </a>
        )
      }
    }
    cursor = index + token.length
  }

  if (cursor < value.length) nodes.push(value.slice(cursor))
  return nodes
}

function MarkdownBody({
  body,
  briefYaml,
}: {
  body: string
  briefYaml?: string
}) {
  const chunks = body.split(/(```[\s\S]*?```)/g).filter(Boolean)

  return (
    <div className="space-y-4">
      {chunks.map((chunk, chunkIndex) => {
        if (chunk.startsWith("```")) {
          const firstBreak = chunk.indexOf("\n")
          const language = chunk.slice(3, firstBreak).trim()
          const code = chunk.slice(firstBreak + 1, -3).trim()
          if (language === "yaml" && briefYaml && code === briefYaml) {
            return null
          }
          return (
            <div
              key={chunkIndex}
              className="overflow-hidden rounded-2xl bg-foreground text-background"
            >
              {language && (
                <div className="border-b border-background/10 px-4 py-2 font-mono text-[10px] text-background/50 uppercase">
                  {language}
                </div>
              )}
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          )
        }

        const lines = chunk.split("\n")
        const rendered: ReactNode[] = []
        let paragraph: string[] = []

        const flush = () => {
          if (!paragraph.length) return
          rendered.push(
            <p
              key={`p-${chunkIndex}-${rendered.length}`}
              className="text-sm leading-7 text-muted-foreground"
            >
              {inline(paragraph.join(" "))}
            </p>
          )
          paragraph = []
        }

        lines.forEach((rawLine, lineIndex) => {
          const line = rawLine.trim()
          if (!line) {
            flush()
            return
          }
          if (line.startsWith("### ")) {
            flush()
            rendered.push(
              <h3
                key={`h-${lineIndex}`}
                className="pt-4 text-base font-medium text-foreground"
              >
                {line.slice(4)}
              </h3>
            )
            return
          }
          if (/^[-*]\s+/.test(line)) {
            flush()
            rendered.push(
              <div
                key={`li-${lineIndex}`}
                className="flex gap-3 text-sm leading-7 text-muted-foreground"
              >
                <CheckIcon
                  className="mt-1.5 size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{inline(line.replace(/^[-*]\s+/, ""))}</span>
              </div>
            )
            return
          }
          if (/^\d+\.\s+/.test(line)) {
            flush()
            const number = line.match(/^\d+/)?.[0]
            rendered.push(
              <div
                key={`ol-${lineIndex}`}
                className="grid grid-cols-[1.5rem_1fr] gap-3 text-sm leading-7 text-muted-foreground"
              >
                <span className="text-xs tabular-nums">{number}</span>
                <span>{inline(line.replace(/^\d+\.\s+/, ""))}</span>
              </div>
            )
            return
          }
          if (line.startsWith("> ")) {
            flush()
            rendered.push(
              <div
                key={`quote-${lineIndex}`}
                className="border-l-2 pl-4 text-sm leading-7 text-muted-foreground"
              >
                {inline(line.slice(2))}
              </div>
            )
            return
          }
          if (line.startsWith("|")) {
            flush()
            rendered.push(
              <pre
                key={`table-${lineIndex}`}
                className="overflow-x-auto border-y py-3 font-mono text-xs text-muted-foreground"
              >
                {line}
              </pre>
            )
            return
          }
          paragraph.push(line)
        })
        flush()

        return (
          <div key={chunkIndex} className="space-y-3">
            {rendered}
          </div>
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

export default async function SourcePlaybookPage({ params }: PageProps) {
  const { slug } = await params
  const [playbook, catalog] = await Promise.all([
    getPlaybookDocument(slug),
    getSourcePlaybooks(),
  ])
  if (!playbook) notFound()
  const catalogEntry = catalog.find((item) => item.slug === slug)
  const referenceSections = playbook.sections.filter(
    (section) => section.title.toLowerCase() !== "what you'll get"
  )
  const intro = playbook.intro.replace(
    /^Paste this whole file.*?(?:Claude cowork, chat, or Code|agent)\.\s*/i,
    ""
  )

  const meta = [
    { label: "Time", value: playbook.duration },
    { label: "Budget", value: playbook.budget },
    { label: "Reliability", value: playbook.reliability },
  ].filter((item) => item.value)

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-4 sm:px-6 sm:pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/mockups/playbooks/library" />}
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
          <div className="flex flex-wrap gap-2">
            {playbook.tier && (
              <Badge variant="secondary">{playbook.tier}</Badge>
            )}
            {playbook.format && (
              <Badge variant="outline">{playbook.format}</Badge>
            )}
          </div>
          <h1 className="mt-5 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            {playbook.title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {meta.map((item) => {
            const values = item.value?.split(/\s*·\s*/).filter(Boolean)

            return (
              <div key={item.label} className="py-2">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <div
                  className={
                    item.label === "Budget"
                      ? "mt-3 space-y-1 text-lg leading-snug font-medium tabular-nums"
                      : "mt-3 space-y-1 text-base leading-snug font-medium tabular-nums"
                  }
                >
                  {values?.map((value) => (
                    <p key={value}>{value}</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {catalogEntry && (
          <section className="mt-14">
            <div className="grid overflow-hidden rounded-4xl bg-muted md:grid-cols-[1.1fr_0.9fr]">
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
                <p className="mb-5 text-sm font-medium">You’ll receive…</p>
                {catalogEntry.deliverables.length > 0 ? (
                  <div className="divide-y">
                    {catalogEntry.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <CheckIcon
                          className="size-4 shrink-0 text-muted-foreground"
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

        <div className="mt-12">
          <PlaybookBriefForm
            brief={playbook.brief}
            markdown={playbook.markdown}
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-xs font-medium">Reference</p>
            <nav className="mt-4 flex flex-col gap-2">
              {referenceSections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.title}
                </a>
              ))}
            </nav>
            {playbook.caps.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-medium">Capabilities</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {playbook.caps.map((cap) => (
                    <Badge key={cap} variant="secondary">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <article className="min-w-0">
            {referenceSections.map((section) => (
              <section
                key={section.title}
                id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="scroll-mt-8 border-t py-9 first:border-t-0 first:pt-0"
              >
                <h2 className="text-2xl font-medium text-balance">
                  {section.title}
                </h2>
                <div className="mt-5">
                  <MarkdownBody
                    body={section.body.replace(/\bBRIEF\b/g, "details")}
                    briefYaml={playbook.brief?.yamlBlock}
                  />
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
      <InstallRunnerFooter />
    </main>
  )
}

export async function generateStaticParams() {
  const playbooks = await getSourcePlaybooks()
  return playbooks.map(({ slug }) => ({ slug }))
}
