import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Inter",
  description:
    "The Livepeer interface face — used for body copy, navigation, controls, labels, and data.",
}

const textRoles = [
  {
    role: "Body",
    token: "text-base · font-normal",
    sample: "Create and edit images and video from the agent of your choice.",
    className: "text-base font-normal leading-7",
  },
  {
    role: "Compact body",
    token: "text-sm · font-normal",
    sample: "Your answers are assembled into the complete prompt when copied.",
    className: "text-sm font-normal leading-6",
  },
  {
    role: "Label",
    token: "text-sm · font-medium",
    sample: "Reference assets",
    className: "text-sm font-medium",
  },
  {
    role: "Metadata",
    token: "text-xs · muted",
    sample: "Updated Jul 26, 2026 · 2–8 minutes",
    className: "text-xs font-normal text-muted-foreground",
  },
  {
    role: "Numeric data",
    token: "tabular-nums",
    sample: "1,284.52 credits",
    className: "text-sm font-medium tabular-nums",
  },
]

export default function InterPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Inter</h1>
      <p className="mt-2 text-balance text-muted-foreground">
        Inter is the default interface face. It carries everything users need to
        scan, read, enter, and compare: body copy, navigation, controls, labels,
        metadata, and tabular data. It is loaded as{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          font-sans
        </code>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Interface example
        </h2>
        <div className="mt-4 rounded-sm bg-muted p-5 font-sans sm:p-8">
          <div className="max-w-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-medium">
                  Generation settings
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure the output before running the playbook.
                </p>
              </div>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="mt-6">
              <Label htmlFor="inter-prompt">Creative prompt</Label>
              <Input
                id="inter-prompt"
                className="mt-2 bg-background"
                placeholder="Describe the subject, setting, and action"
              />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground tabular-nums">
                Estimated cost · $0.84
              </p>
              <Button>Generate video</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Text roles</h2>
        <div className="mt-4 space-y-3 font-sans">
          {textRoles.map((role) => (
            <div key={role.role} className="rounded-sm bg-muted p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{role.role}</p>
                <code className="font-mono text-xs text-muted-foreground">
                  {role.token}
                </code>
              </div>
              <p className={`mt-5 ${role.className}`}>{role.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Principles</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Default", "Use Inter unless the text establishes hierarchy."],
            ["Readable", "Keep body copy at 14–16px with comfortable leading."],
            ["Precise", "Use tabular numerals for changing values and tables."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-sm bg-muted p-5">
              <h3 className="font-sans text-sm font-medium">{title}</h3>
              <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
