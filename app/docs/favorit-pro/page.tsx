import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Favorit Pro",
  description: "Favorit Pro is used for display text and page headings.",
}

const displayScale = [
  {
    role: "H1",
    size: "36–60px",
    token: "text-4xl sm:text-6xl",
    sample: "Create and edit images and video with your agent.",
    className:
      "text-4xl leading-[0.98] font-light tracking-[-0.045em] sm:text-6xl",
  },
  {
    role: "H2",
    size: "36–60px",
    token: "text-4xl sm:text-6xl",
    sample: "Playbooks, ready to run.",
    className:
      "text-4xl leading-none font-light tracking-[-0.04em] sm:text-6xl",
  },
  {
    role: "H3",
    size: "24–30px",
    token: "text-2xl sm:text-3xl",
    sample: "Livepeer Agent",
    className:
      "text-2xl leading-tight font-light tracking-tight sm:text-3xl",
  },
]

function TypeRow({
  role,
  sample,
  className,
}: (typeof displayScale)[number]) {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <p className="font-sans text-sm text-muted-foreground">{role}</p>
      <p className={`mt-4 text-balance font-heading ${className}`}>{sample}</p>
    </div>
  )
}

export default function FavoritProPage() {
  return (
    <article className="max-w-3xl font-sans">
      <h1 className="text-3xl tracking-tight">Favorit Pro</h1>
      <p className="mt-2 max-w-2xl text-balance text-muted-foreground">
        Favorit Pro is used for display text and page headings. The examples
        below reproduce headings from the current mockups.
      </p>

      <section className="mt-10">
        <h2 className="text-xl tracking-tight">Display text</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These H1–H3 examples use text and sizes from Livepeer.org and its
          product pages.
        </p>
        <div className="mt-6 space-y-10">
          {displayScale.map((role) => (
            <TypeRow key={role.role} {...role} />
          ))}
        </div>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Product interface text and numeric data use{" "}
        <Link
          href="/docs/inter"
          className="text-foreground underline underline-offset-4"
        >
          Inter
        </Link>
        .
      </p>
    </article>
  )
}
