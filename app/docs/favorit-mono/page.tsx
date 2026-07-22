import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"

export const metadata: Metadata = {
  title: "Favorit Mono",
  description: "The brand mono — sets code, data, and technical annotation.",
}

const ALPHABET = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789"

const WEIGHTS = [
  { label: "Regular", value: 400, className: "font-normal" },
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

const CODE_SAMPLE = `const stream = await livepeer.stream.create({
  name: "quickstart",
  profiles: [{ bitrate: 3_000_000, fps: 30 }],
})`

export default function FavoritMonoPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Favorit Mono</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        The brand mono. The monospaced cut of{" "}
        <a
          href="https://abcdinamo.com/typefaces/favorit"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Favorit
        </a>{" "}
        keeps the same skeleton on a fixed pitch. It sets code, data, and
        technical annotation — every code block, install command, and inline
        reference — loaded as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          --font-mono
        </code>
        .
      </p>

      <div className="mt-8 flex flex-col gap-8 rounded-lg border p-6 font-mono sm:p-8">
        <p className="text-4xl sm:text-5xl">LIVEPEER</p>
        <p className="break-words text-base text-muted-foreground">{ALPHABET}</p>
        <p className="text-lg">0O 1lI 5S 8B — legibility at a glance</p>
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
            <span className={`font-mono text-xl ${weight.className}`}>
              $ npx shadcn add @livepeer-ui/button
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
            <span className={`font-mono leading-none whitespace-nowrap ${sizeStep.className}`}>
              Livepeer
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">In code</h2>
      <div className="mt-4">
        <CodeBlock code={CODE_SAMPLE} lang="ts" />
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        For interface and product text, see{" "}
        <Link
          href="/docs/favorit-pro"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Favorit Pro
        </Link>
        .
      </p>
    </article>
  )
}
