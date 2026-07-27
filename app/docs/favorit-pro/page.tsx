import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Favorit Pro",
  description:
    "The Livepeer display face — used for page titles, section headings, and expressive brand moments.",
}

const roles = [
  {
    token: "font-display",
    role: "Display",
    usage: "Brand statements and high-impact marketing copy",
    sample: "Open video infrastructure",
    className:
      "font-display text-5xl leading-[0.95] font-light tracking-[-0.035em] sm:text-7xl",
  },
  {
    token: "font-heading",
    role: "Page title",
    usage: "Primary page and workspace headings",
    sample: "Agent Playbooks",
    className: "font-heading text-3xl font-semibold tracking-tight",
  },
  {
    token: "font-heading",
    role: "Section title",
    usage: "Major sections within a page",
    sample: "Customize this playbook",
    className: "font-heading text-2xl font-normal tracking-tight",
  },
  {
    token: "font-heading",
    role: "Component title",
    usage: "Cards, dialogs, sheets, and grouped controls",
    sample: "Generation settings",
    className: "font-heading text-base font-medium",
  },
]

export default function FavoritProPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Favorit Pro</h1>
      <p className="mt-2 text-balance text-muted-foreground">
        Favorit Pro is the display and heading face. We use its plain, technical
        character to establish hierarchy—not for body copy or dense interface
        text. It is loaded as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          font-display
        </code>{" "}
        and{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          font-heading
        </code>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Display</h2>
        <div className="mt-4 rounded-sm bg-muted px-5 py-12 sm:px-8 sm:py-16">
          <p className="font-display text-5xl leading-[0.92] font-light tracking-[-0.04em] text-balance sm:text-7xl">
            Video belongs to everyone.
          </p>
          <p className="mt-8 max-w-xl font-sans text-sm leading-6 text-muted-foreground">
            Pair large, light Favorit with restrained tracking and Inter
            supporting copy. Keep the line length short enough for the letter
            shapes to carry the composition.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Roles in the interface
        </h2>
        <div className="mt-4 space-y-3">
          {roles.map((role) => (
            <div
              key={`${role.role}-${role.sample}`}
              className="rounded-sm bg-muted p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-sans text-sm font-medium">{role.role}</p>
                <code className="font-mono text-xs text-muted-foreground">
                  {role.token}
                </code>
              </div>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                {role.usage}
              </p>
              <p className={`mt-6 text-balance ${role.className}`}>
                {role.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
        <div className="mt-4 rounded-sm bg-muted p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-base font-medium">
                Use Favorit for
              </h3>
              <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground">
                Display copy, page titles, section headings, card titles, dialog
                titles, and short brand statements.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-medium">
                Use Inter for
              </h3>
              <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground">
                Body copy, navigation, labels, controls, tables, metadata, and
                other interface text that prioritizes reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        For the default interface face, see{" "}
        <Link
          href="/docs/inter"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Inter
        </Link>
        .
      </p>
    </article>
  )
}
