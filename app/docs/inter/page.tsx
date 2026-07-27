import type { Metadata } from "next"

import { ComputeMetrics } from "@/components/mockups/compute-metrics"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Inter",
  description:
    "Inter is used for the product interface and numeric data.",
}

const interfaceScale = [
  {
    role: "H1",
    size: "32px / 32px",
    token: "text-[2rem]",
    sample: "Compute",
    className: "text-[2rem] leading-none tracking-[-0.025em]",
  },
  {
    role: "H2",
    size: "24px / 32px",
    token: "text-2xl",
    sample: "Get more credits",
    className: "text-2xl leading-8 tracking-tight",
  },
  {
    role: "H3",
    size: "16px / 24px",
    token: "text-base",
    sample: "Livepeer Agent",
    className: "text-base leading-6",
  },
  {
    role: "Body copy",
    size: "16px / 24px",
    token: "text-base",
    sample:
      "Configure the playbook, add reference assets, and review the expected output.",
    className: "text-base leading-6",
  },
  {
    role: "Labels",
    size: "14px / 20px",
    token: "text-sm",
    sample: "Reference assets",
    className: "text-sm leading-5",
  },
  {
    role: "Metadata",
    size: "12px / 16px",
    token: "text-xs",
    sample: "Updated Jul 26, 2026 · 2–8 minutes",
    className: "text-xs leading-4 text-muted-foreground",
  },
  {
    role: "Dense metadata",
    size: "11px / 16px",
    token: "text-[11px]",
    sample: "MODEL · RUN TIME · STATUS",
    className:
      "text-[11px] leading-4 tracking-wide text-muted-foreground uppercase",
  },
]

const numericScale = [
  {
    role: "Primary metric",
    size: "36px / 40px",
    token: "text-4xl",
    sample: "1,284.52",
    className: "text-4xl leading-10 tabular-nums",
  },
  {
    role: "Summary value",
    size: "24px / 32px",
    token: "text-2xl",
    sample: "$42.80",
    className: "text-2xl leading-8 tabular-nums",
  },
  {
    role: "Table value",
    size: "14px / 20px",
    token: "text-sm",
    sample: "00:02:18",
    className: "text-sm leading-5 tabular-nums",
  },
  {
    role: "Numeric metadata",
    size: "12px / 16px",
    token: "text-xs",
    sample: "2–8 MIN · $0.84",
    className: "text-xs leading-4 tabular-nums text-muted-foreground",
  },
]

export default function InterPage() {
  return (
    <article className="max-w-3xl font-sans">
      <h1 className="text-3xl tracking-tight">Inter</h1>
      <p className="mt-2 max-w-2xl text-balance text-muted-foreground">
        Inter is used for the product interface and numeric data. This includes
        page titles, body text, labels, metadata, metrics, and tables.
      </p>

      <section className="mt-10">
        <h2 className="text-xl tracking-tight">Platform interface</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The Compute page uses Inter for its page title, description, action,
          metric labels, and numeric data.
        </p>
        <div className="mt-6 flex min-h-[350px] w-full items-center justify-center overflow-hidden rounded-lg border p-6 sm:p-10">
          <div className="w-full font-sans">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div>
                <p className="text-[2rem] leading-[0.98] font-light tracking-[-0.025em] text-balance">
                  Compute
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monitor network compute and orchestrator performance.
                </p>
              </div>
              <Button size="lg" className="h-16 rounded-sm px-5">
                Run an Orchestrator
                <span aria-hidden="true">↗</span>
              </Button>
            </div>
            <div className="mt-10">
              <ComputeMetrics
                stats={[
                  {
                    label: "Service payouts (USD)",
                    value: "$12.4K",
                    period: "24h",
                  },
                  {
                    label: "Protocol rewards (USD)",
                    value: "$8.7K",
                    period: "24h",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl tracking-tight">Product interface</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These sizes reflect their use in headings, body text, labels, and
          metadata.
        </p>
        <div className="mt-6 space-y-10 font-sans">
          {interfaceScale.map((role) => (
            <div key={role.role} className="py-6 first:pt-0 last:pb-0">
              <p className="text-sm text-muted-foreground">{role.role}</p>
              <p className={`mt-4 max-w-2xl ${role.className}`}>
                {role.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl tracking-tight">Numbers</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use tabular numerals for metrics, balances, durations, prices, and
          table values.
        </p>
        <div className="mt-6 space-y-10">
          {numericScale.map((role) => (
            <div key={role.role} className="py-6 first:pt-0 last:pb-0">
              <p className="text-sm text-muted-foreground">{role.role}</p>
              <p className={`mt-4 ${role.className}`}>{role.sample}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
