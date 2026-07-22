import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDownToLineIcon } from "lucide-react"

import {
  LivepeerLockup,
  LivepeerSymbol,
  LivepeerWordmark,
} from "@/components/brand"
import { InstallCommand } from "@/components/docs/install-command"
import { cn } from "@/lib/utils"
import { registryItemUrl } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Livepeer brand marks — symbol, wordmark, and lockup as React components.",
}

function DownloadOverlay({
  href,
  label,
  className,
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <a
      href={href}
      download
      aria-label={label}
      className={cn(
        "absolute top-3 right-3 opacity-50 transition-opacity hover:opacity-100",
        className
      )}
    >
      <ArrowDownToLineIcon className="size-4" />
    </a>
  )
}

function MarkTile({
  children,
  label,
  lightFile,
  darkFile,
}: {
  children: React.ReactNode
  label: string
  lightFile: string
  darkFile: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-2">
        <div className="relative flex min-h-[180px] items-center justify-center bg-background p-8 text-foreground">
          {children}
          <DownloadOverlay
            href={`/brand/${lightFile}`}
            label="Download light variant SVG"
            className="text-foreground"
          />
        </div>
        <div className="relative flex min-h-[180px] items-center justify-center border-t bg-neutral-950 p-8 text-white sm:border-t-0 sm:border-l">
          {children}
          <DownloadOverlay
            href={`/brand/${darkFile}`}
            label="Download dark variant SVG"
            className="text-white"
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
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
        as black and white SVG files — download either variant from its tile.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Symbol</h2>
      <div className="mt-4">
        <MarkTile
          label="The symbol stands alone at small sizes."
          lightFile="livepeer-symbol-black.svg"
          darkFile="livepeer-symbol-white.svg"
        >
          <LivepeerSymbol className="h-16 w-auto" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Wordmark</h2>
      <div className="mt-4">
        <MarkTile
          label="The wordmark, set in the brand letterforms."
          lightFile="livepeer-wordmark-black.svg"
          darkFile="livepeer-wordmark-white.svg"
        >
          <LivepeerWordmark className="h-8 w-auto max-w-full" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Lockup</h2>
      <div className="mt-4">
        <MarkTile
          label="Symbol and wordmark combined. Preferred where space allows."
          lightFile="livepeer-lockup-black.svg"
          darkFile="livepeer-lockup-white.svg"
        >
          <LivepeerLockup className="h-8 w-auto max-w-full" />
        </MarkTile>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Favicon</h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-2">
          <div className="relative flex min-h-[140px] items-center justify-center gap-6 bg-background p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon.svg" alt="Favicon at 32px" className="size-8" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon.svg" alt="Favicon at 16px" className="size-4" />
            <DownloadOverlay
              href="/brand/favicon.svg"
              label="Download favicon SVG"
              className="text-foreground"
            />
          </div>
          <div className="relative flex min-h-[140px] items-center justify-center gap-6 border-t bg-neutral-950 p-8 sm:border-t-0 sm:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon-dark-preview.svg" alt="Favicon on dark at 32px" className="size-8" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon-dark-preview.svg" alt="Favicon on dark at 16px" className="size-4" />
            <DownloadOverlay
              href="/brand/favicon-dark-preview.svg"
              label="Download white favicon SVG"
              className="text-white"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          SVG favicon with an embedded{" "}
          <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
            prefers-color-scheme
          </code>{" "}
          query — black in light tabs, white in dark tabs.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Open Graph</h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/og.png"
            alt="Open Graph embed — the lockup centered on black, 1200 by 630"
            className="w-full"
          />
          <DownloadOverlay
            href="/brand/og.png"
            label="Download Open Graph PNG"
            className="text-white"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          The share embed — lockup centered on black, 1200 × 630. Served on
          every page via Open Graph and Twitter card metadata.
        </p>
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
