import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Typography",
  description:
    "The two brand typefaces — Favorit Pro for interface and product, Favorit Mono for code and data.",
}

const ALPHABET = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789"

function SpecimenHeader({
  name,
  role,
  source,
}: {
  name: string
  role: string
  source: string
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      </div>
      <a
        href={source}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        {source.replace("https://", "")}
      </a>
    </div>
  )
}

export default function TypographyPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Typography</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        Two typefaces carry the brand. Favorit Pro sets all interface and
        product text. Favorit Mono sets code, data, and technical annotation.
        Both are self-hosted and loaded as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          --font-sans
        </code>{" "}
        and{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          --font-mono
        </code>
        .
      </p>

      <section className="mt-10">
        <SpecimenHeader
          name="Favorit Pro"
          role="Sans — interface, product, and marketing text. Weights 300, 400, 450, 500, 700."
          source="https://abcdinamo.com/typefaces/favorit"
        />
        <div className="mt-4 flex flex-col gap-6 rounded-lg border p-6 sm:p-8">
          <p className="text-4xl font-normal tracking-tight text-balance sm:text-5xl">
            Open video infrastructure
          </p>
          <p className="break-words text-lg text-muted-foreground">{ALPHABET}</p>
          <div className="flex flex-col gap-2 text-2xl">
            <p className="font-light">Light — The quick brown fox jumps over the lazy dog</p>
            <p className="font-normal">Regular — The quick brown fox jumps over the lazy dog</p>
            <p className="font-[450]">Book — The quick brown fox jumps over the lazy dog</p>
            <p className="font-medium">Medium — The quick brown fox jumps over the lazy dog</p>
            <p className="font-bold">Bold — The quick brown fox jumps over the lazy dog</p>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            Favorit is a grotesk by Dinamo with a deliberately plain, almost
            technical posture — flat curves, even rhythm, no flourish. Use it
            for everything that is not code.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <SpecimenHeader
          name="Favorit Mono"
          role="Mono — code, data, and technical annotation. Weights 400, 500, 700."
          source="https://abcdinamo.com/typefaces/favorit"
        />
        <div className="mt-4 flex flex-col gap-6 rounded-lg border p-6 sm:p-8 font-mono">
          <p className="text-3xl sm:text-4xl">LIVEPEER</p>
          <p className="break-words text-base text-muted-foreground">{ALPHABET}</p>
          <div className="flex flex-col gap-2 text-lg">
            <p>Regular — 0O 1lI 5S 8B {"->"} legibility at a glance</p>
            <p className="font-medium">Medium — const stream = await broadcast()</p>
            <p className="font-bold">Bold — $ npx shadcn add @livepeer-ui/button</p>
          </div>
          <p className="max-w-prose font-sans text-sm leading-relaxed text-muted-foreground">
            The monospaced cut of Favorit keeps the same skeleton on a fixed
            pitch. It sets every code block, install command, and inline
            technical reference in the docs.
          </p>
        </div>
      </section>
    </article>
  )
}
