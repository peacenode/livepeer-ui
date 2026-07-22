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

const SIZES = [
  { label: "xs", px: "12px", className: "text-xs" },
  { label: "sm", px: "14px", className: "text-sm" },
  { label: "base", px: "16px", className: "text-base" },
  { label: "lg", px: "18px", className: "text-lg" },
  { label: "xl", px: "20px", className: "text-xl" },
  { label: "2xl", px: "24px", className: "text-2xl" },
  { label: "3xl", px: "30px", className: "text-3xl" },
  { label: "4xl", px: "36px", className: "text-4xl" },
  { label: "5xl", px: "48px", className: "text-5xl" },
  { label: "6xl", px: "60px", className: "text-6xl" },
  { label: "7xl", px: "72px", className: "text-7xl" },
  { label: "8xl", px: "96px", className: "text-8xl" },
  { label: "9xl", px: "128px", className: "text-9xl" },
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
      <div className="mt-4 flex flex-col divide-y rounded-lg border">
        {SIZES.map((sizeStep) => (
          <div key={sizeStep.label} className="flex flex-col gap-2 overflow-x-auto p-6">
            <span className="font-mono text-xs text-muted-foreground">
              {sizeStep.label} · {sizeStep.px}
            </span>
            <span className={`leading-none tracking-tight whitespace-nowrap ${sizeStep.className}`}>
              Livepeer
            </span>
          </div>
        ))}
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
