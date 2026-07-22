import type { Metadata } from "next"
import Link from "next/link"

import {
  LivepeerLockup,
  LivepeerSymbol,
  LivepeerWordmark,
} from "@/components/brand"
import { InstallCommand } from "@/components/docs/install-command"
import { Button } from "@/components/ui/button"
import { registryItemUrl } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Livepeer brand marks — symbol, wordmark, and lockup as React components.",
}

function MarkTile({
  children,
  label,
  file,
}: {
  children: React.ReactNode
  label: string
  file: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-2">
        <div className="flex min-h-[180px] items-center justify-center bg-background p-8 text-foreground">
          {children}
        </div>
        <div className="flex min-h-[180px] items-center justify-center border-t bg-neutral-950 p-8 text-white sm:border-t-0 sm:border-l">
          {children}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Button
          variant="outline"
          size="sm"
          render={<a href={`/brand/${file}`} download />}
        >
          Download SVG
        </Button>
      </div>
    </div>
  )
}

export default function BrandPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Brand</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        The Livepeer marks — symbol, wordmark, and lockup. Available as
        theme-aware React components that inherit the current text color, and
        as the original white SVG files.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Symbol</h2>
      <div className="mt-4">
        <MarkTile label="The symbol stands alone at small sizes." file="livepeer-symbol-white.svg">
          <LivepeerSymbol className="h-16 w-auto" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Wordmark</h2>
      <div className="mt-4">
        <MarkTile label="The wordmark, set in the brand letterforms." file="livepeer-wordmark-white.svg">
          <LivepeerWordmark className="h-8 w-auto max-w-full" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Lockup</h2>
      <div className="mt-4">
        <MarkTile label="Symbol and wordmark combined. Preferred where space allows." file="livepeer-lockup-white.svg">
          <LivepeerLockup className="h-8 w-auto max-w-full" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The marks are available from the registry as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          LivepeerSymbol
        </code>
        ,{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          LivepeerWordmark
        </code>
        , and{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          LivepeerLockup
        </code>
        . They render in{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          currentColor
        </code>{" "}
        and size with CSS.
      </p>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl("brand")} />
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Set the marks in the brand typefaces where type accompanies them — see{" "}
        <Link
          href="/docs/typography"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Typography
        </Link>
        .
      </p>
    </article>
  )
}
