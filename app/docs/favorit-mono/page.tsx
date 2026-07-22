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

const CODE_SAMPLE = `const stream = await livepeer.stream.create({
  name: "quickstart",
  profiles: [{ bitrate: 3_000_000, fps: 30 }],
})`

export default function FavoritMonoPage() {
  return (
    <article className="max-w-3xl">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Favorit Mono</h1>
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
        The brand mono. The monospaced cut of Favorit keeps the same skeleton
        on a fixed pitch. It sets code, data, and technical annotation — every
        code block, install command, and inline reference — loaded as{" "}
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
