import "server-only"

const origin = "https://storyboard.daydream.monster"

export type SourcePlaybook = {
  slug: string
  title: string
  summary: string
  tags: string[]
  image: string | null
  deliverables: string[]
  stats: { value: string; label: string }[]
}

export type PlaybookDocument = {
  slug: string
  title: string
  tier?: string
  format?: string
  theme?: string
  persona?: string
  duration?: string
  budget?: string
  reliability?: string
  caps: string[]
  intro: string
  sections: { title: string; body: string }[]
  sourceUrl: string
}

function text(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rarr;/g, "→")
    .replace(/\s+/g, " ")
    .trim()
}

export async function getSourcePlaybooks(): Promise<SourcePlaybook[]> {
  const response = await fetch(`${origin}/playbooks/`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) throw new Error("Unable to load the Playbooks catalog")

  const html = await response.text()
  const matches = [
    ...html.matchAll(
      /<div class="card" data-href="\/playbooks\/viewer\.html\?p=([^"]+)" data-tags="([^"]*)">/g
    ),
  ].filter((match) => match[1] !== "DESIGN")

  return matches.map((match, index) => {
    const start = match.index ?? 0
    const end =
      matches[index + 1]?.index ?? html.indexOf("</div>\n\n  </div>", start)
    const block = html.slice(start, end > start ? end : undefined)
    const image = block.match(/<img src="([^"]+)"/)?.[1] ?? null
    const title = text(block.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? match[1])
    const summary = text(
      block.match(/<p class="tldr">([\s\S]*?)<\/p>/)?.[1] ?? ""
    )
    const deliverables = [
      ...block.matchAll(/<span class="deliv">([\s\S]*?)<\/span>/g),
    ].map((item) => text(item[1]))
    const stats = [
      ...block.matchAll(
        /<div class="stat"><strong>([\s\S]*?)<\/strong><span>([\s\S]*?)<\/span><\/div>/g
      ),
    ].map((item) => ({ value: text(item[1]), label: text(item[2]) }))

    return {
      slug: match[1],
      title,
      summary,
      tags: match[2].split(/\s+/).filter(Boolean),
      image: image
        ? image.startsWith("http")
          ? image
          : `${origin}${image}`
        : null,
      deliverables,
      stats,
    }
  })
}

function parseScalar(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "")
}

export async function getPlaybookDocument(
  slug: string
): Promise<PlaybookDocument | null> {
  const sourceUrl = `${origin}/playbooks/${encodeURIComponent(slug)}.md`
  const response = await fetch(sourceUrl, { next: { revalidate: 3600 } })
  if (!response.ok) return null

  const markdown = await response.text()
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  const frontmatter = frontmatterMatch?.[1] ?? ""
  const body = markdown.slice(frontmatterMatch?.[0].length ?? 0)
  const fields = new Map(
    [...frontmatter.matchAll(/^([a-z_]+):\s*(.+)$/gm)].map((item) => [
      item[1],
      item[2],
    ])
  )
  const capsValue = fields.get("caps")
  const caps = capsValue
    ? capsValue
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((item) => parseScalar(item))
        .filter((item): item is string => Boolean(item))
    : []
  const heading = body.match(/^#\s+(.+)$/m)?.[1] ?? slug
  const intro = body.match(/^>\s+(.+(?:\n>\s+.*)*)/m)?.[1] ?? ""
  const sectionMatches = [...body.matchAll(/^##\s+(.+)$/gm)]
  const sections = sectionMatches.map((section, index) => {
    const start = (section.index ?? 0) + section[0].length
    const end = sectionMatches[index + 1]?.index ?? body.length
    return {
      title: section[1].trim(),
      body: body.slice(start, end).trim(),
    }
  })

  return {
    slug,
    title: parseScalar(fields.get("title")) ?? heading.replace(/\s+⭐.*$/, ""),
    tier: parseScalar(fields.get("tier")),
    format: parseScalar(fields.get("format")),
    theme: parseScalar(fields.get("theme")),
    persona: parseScalar(fields.get("persona")),
    duration: parseScalar(fields.get("duration")),
    budget: parseScalar(fields.get("budget_usd")),
    reliability: parseScalar(fields.get("reliability"))?.split("#")[0].trim(),
    caps,
    intro: intro.replace(/^>\s+/gm, "").replace(/\*\*/g, "").trim(),
    sections,
    sourceUrl,
  }
}
