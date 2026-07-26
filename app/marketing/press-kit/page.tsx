import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check, CircleAlert, Clock3, Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { pressSurfaces, sharedAssetGroups } from "@/lib/press-kit"

export const metadata: Metadata = {
  title: "Press Kit · Social Surface",
  description:
    "Livepeer social channels, publishing surfaces, and the assets required to maintain them.",
}

export default function PressKitPage() {
  const primaryCount = pressSurfaces.filter(
    (surface) => surface.status === "primary"
  ).length
  const reviewCount = pressSurfaces.filter(
    (surface) => surface.status === "verify"
  ).length

  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      <header className="border-b pb-10">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Press kit / Social surface
        </p>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl font-medium tracking-tight sm:text-5xl">
              One inventory for every public Livepeer surface
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              A working map of official channels, legacy publications, and the
              identity assets needed to update them consistently.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/docs/assets" />}>
            <Download data-icon="inline-start" />
            Available brand files
          </Button>
        </div>
      </header>

      <section className="grid border-b sm:grid-cols-3">
        <Metric label="Surfaces inventoried" value={pressSurfaces.length} />
        <Metric label="Primary channels" value={primaryCount} />
        <Metric label="Ownership to verify" value={reviewCount} />
      </section>

      <section className="border-b py-10">
        <div className="mb-6 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight">
            Channel inventory
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Compiled from the current website, community documentation, linked
            profiles, and indexed publications. “Verify” means the surface is
            public but its ownership or current role is not established by the
            main site.
          </p>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Surface</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-72">Role</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Open</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pressSurfaces.map((surface) => (
                <TableRow key={`${surface.name}-${surface.handle}`}>
                  <TableCell className="whitespace-normal">
                    <div className="font-medium">{surface.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {surface.handle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={surface.status} />
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <p className="leading-5">{surface.role}</p>
                    {surface.note ? (
                      <p className="mt-1.5 max-w-xl text-xs leading-5 text-muted-foreground">
                        {surface.note}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <p className="max-w-64 text-xs leading-5 text-muted-foreground">
                      {surface.assets.join(" · ")}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Open ${surface.name}`}
                      render={
                        <a
                          href={surface.url}
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                    >
                      <ArrowUpRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border-b py-10">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight">
            Asset production list
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Build these as shared masters first. Platform-specific exports
            should be generated from the same source files and dated as one
            release.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {sharedAssetGroups.map((group) => (
            <div key={group.name}>
              <h3 className="border-b pb-3 text-sm font-medium">{group.name}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-5 text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Decisions before export
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Resolve these account questions before production so the asset
              batch lands on the right surfaces.
            </p>
          </div>
          <ol className="divide-y border-y">
            <Decision
              index="01"
              title="Consolidate YouTube"
              body="Choose one canonical channel and document whether @livepeer and @LivepeerOrg should redirect, remain archival, or serve distinct audiences."
            />
            <Decision
              index="02"
              title="Confirm the newsletter home"
              body="No official Substack surfaced. Confirm whether Paragraph is owned and active, then decide whether Field Notes on livepeer.org is the canonical archive."
            />
            <Decision
              index="03"
              title="Retire or refresh legacy publishers"
              body="Medium, Mirror, Linktree, and older social references need an explicit archive, redirect, or maintenance policy."
            />
            <Decision
              index="04"
              title="Record access and ownership"
              body="Add a non-public owner, recovery contact, authentication method, and last-access check for every account."
            />
          </ol>
        </div>
      </section>

      <footer className="flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Research snapshot: July 26, 2026</span>
        <span>Recheck links, owners, and visuals quarterly.</span>
      </footer>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="py-6 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
      <div className="text-3xl font-medium tabular-nums">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: "primary" | "secondary" | "legacy" | "verify"
}) {
  const labels = {
    primary: "Primary",
    secondary: "Secondary",
    legacy: "Legacy",
    verify: "Verify",
  }

  return (
    <Badge variant={status === "verify" ? "outline" : "secondary"}>
      {status === "verify" ? <CircleAlert /> : null}
      {status === "legacy" ? <Clock3 /> : null}
      {labels[status]}
    </Badge>
  )
}

function Decision({
  index,
  title,
  body,
}: {
  index: string
  title: string
  body: string
}) {
  return (
    <li className="grid gap-2 py-5 sm:grid-cols-[2.5rem_12rem_1fr] sm:gap-4">
      <span className="text-xs tabular-nums text-muted-foreground">{index}</span>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{body}</p>
    </li>
  )
}
