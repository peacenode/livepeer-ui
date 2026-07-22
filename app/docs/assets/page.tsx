import type { Metadata } from "next"
import { ArrowDownToLineIcon } from "lucide-react"

import { InstallCommand } from "@/components/docs/install-command"
import { cn } from "@/lib/utils"
import { registryItemUrl } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Assets",
  description:
    "Ready-to-install brand assets — the theme-aware favicon and the Open Graph embed.",
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

export default function AssetsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Assets</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        Ready-to-install brand assets. Each installs into a Next.js app as a
        file the framework picks up automatically.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Favicon</h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-2">
          <div className="relative flex min-h-[140px] items-center justify-center bg-background p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon.svg" alt="Favicon, light scheme" className="size-8" />
            <DownloadOverlay
              href="/brand/favicon.svg"
              label="Download favicon SVG"
              className="text-foreground"
            />
          </div>
          <div className="relative flex min-h-[140px] items-center justify-center border-t bg-neutral-950 p-8 sm:border-t-0 sm:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/favicon-dark-preview.svg" alt="Favicon, dark scheme" className="size-8" />
            <DownloadOverlay
              href="/brand/favicon-dark-preview.svg"
              label="Download white favicon SVG"
              className="text-white"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          A single SVG with an embedded{" "}
          <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
            prefers-color-scheme
          </code>{" "}
          query — black in light tabs, white in dark tabs. Installs as{" "}
          <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
            app/icon.svg
          </code>
          .
        </p>
        <InstallCommand url={registryItemUrl("favicon")} />
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
          The share embed — lockup centered on black, 1200 × 630. Installs as
          a file-based{" "}
          <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
            app/opengraph-image.tsx
          </code>{" "}
          route, served automatically on every page.
        </p>
        <InstallCommand url={registryItemUrl("og")} />
      </div>
    </article>
  )
}
