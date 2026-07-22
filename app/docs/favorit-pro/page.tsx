import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Favorit Pro",
  description:
    "The brand sans — sets all interface, product, and marketing text.",
}

const ALPHABET = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789"

const WEIGHTS = [
  { label: "Light", value: 300, className: "font-light" },
  { label: "Regular", value: 400, className: "font-normal" },
  { label: "Book", value: 450, className: "font-[450]" },
  { label: "Medium", value: 500, className: "font-medium" },
  { label: "Bold", value: 700, className: "font-bold" },
]

export default function FavoritProPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Favorit Pro</h1>
        <a
          href="https://abcdinamo.com/typefaces/favorit"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          abcdinamo.com/typefaces/favorit
        </a>
      </div>
      <p className="mt-2 text-muted-foreground text-balance">
        The brand sans. Favorit is a grotesk by Dinamo with a deliberately
        plain, almost technical posture — flat curves, even rhythm, no
        flourish. It sets all interface, product, and marketing text, loaded as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          --font-sans
        </code>
        .
      </p>

      <div className="mt-8 flex flex-col gap-8 rounded-lg border p-6 sm:p-8">
        <p className="text-5xl font-normal tracking-tight text-balance sm:text-6xl">
          Open video infrastructure
        </p>
        <p className="break-words text-lg text-muted-foreground">{ALPHABET}</p>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Weights</h2>
      <div className="mt-4 flex flex-col divide-y rounded-lg border">
        {WEIGHTS.map((weight) => (
          <div
            key={weight.value}
            className="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
              {weight.label} · {weight.value}
            </span>
            <span className={`text-2xl ${weight.className}`}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Scale</h2>
      <div className="mt-4 flex flex-col gap-4 rounded-lg border p-6 sm:p-8">
        <p className="text-4xl font-medium tracking-tight">Orchestrate the network</p>
        <p className="text-2xl font-medium tracking-tight">Orchestrate the network</p>
        <p className="text-lg">Orchestrate the network</p>
        <p className="text-sm">Orchestrate the network</p>
        <p className="text-xs text-muted-foreground">Orchestrate the network</p>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Note that Book (450) is drawn lighter than Regular — that is the
        typeface&apos;s design, not a loading error. For code and data, see{" "}
        <Link
          href="/docs/favorit-mono"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Favorit Mono
        </Link>
        .
      </p>
    </article>
  )
}
