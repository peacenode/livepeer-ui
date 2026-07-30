import type { Metadata } from "next"
import { ArrowDownToLineIcon } from "lucide-react"

import { InstallCommand } from "@/components/docs/install-command"
import { registryItemUrl } from "@/lib/docs"
import { getSocialPreviewImagePath } from "@/lib/social-assets"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Assets",
  description:
    "Ready-to-use brand assets, including social previews and the theme-aware favicon.",
}

const socialPreviews = [
  {
    width: 1200,
    height: 630,
    alt: "Livepeer landscape social preview",
  },
  {
    width: 1280,
    height: 640,
    alt: "Livepeer GitHub social preview",
  },
  {
    width: 1080,
    height: 1080,
    alt: "Livepeer square social preview",
  },
]

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
      <p className="mt-2 text-balance text-muted-foreground">
        Ready-to-use brand assets and framework files.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Favicon</h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border sm:grid-cols-2">
          <div className="relative flex min-h-[140px] items-center justify-center bg-background p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon.svg"
              alt="Favicon, light scheme"
              className="size-8"
            />
            <DownloadOverlay
              href="/brand/favicon.svg"
              label="Download favicon SVG"
              className="text-foreground"
            />
          </div>
          <div className="relative flex min-h-[140px] items-center justify-center border-t bg-neutral-950 p-8 sm:border-t-0 sm:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon-dark-preview.svg"
              alt="Favicon, dark scheme"
              className="size-8"
            />
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

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Social previews
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Finished PNGs for landscape embeds, GitHub previews, and square social
        posts.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {socialPreviews.map(({ width, height, alt }) => (
          <figure
            key={`${width}x${height}`}
            className="overflow-hidden rounded-lg border"
          >
            <div className="relative flex aspect-4/3 items-center justify-center bg-muted p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getSocialPreviewImagePath(width, height)}
                alt={alt}
                className="max-h-full max-w-full"
              />
              <DownloadOverlay
                href={getSocialPreviewImagePath(width, height)}
                label={`Download ${width} by ${height} social preview PNG`}
                className="text-foreground"
              />
            </div>
            <figcaption className="border-t px-3 py-2 text-sm text-muted-foreground">
              {width} × {height} px
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  )
}
