import Link from "next/link"

export type PlaybookCardData = {
  slug: string
  title: string
  image: string | null
}

export function PlaybookCard({
  hrefBase = "/mockups/livepeer-agent/playbooks",
  playbook,
}: {
  hrefBase?: string
  playbook: PlaybookCardData
}) {
  return (
    <Link
      href={`${hrefBase}/${playbook.slug}`}
      className="group block rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <article>
        <div
          className="aspect-square overflow-hidden rounded-sm bg-muted bg-cover bg-center"
          style={
            playbook.image
              ? { backgroundImage: `url("${playbook.image}")` }
              : undefined
          }
          aria-hidden="true"
        />
        <div className="mt-4 flex max-w-sm flex-col gap-1.5">
          <h2 className="line-clamp-2 font-heading text-xl font-normal">
            {playbook.title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
