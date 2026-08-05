"use client"

import { useState } from "react"
import {
  CircleDollarSign,
  CreditCard,
  FileText,
  Gauge,
  Settings2,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type BalanceShortcut = {
  label: string
  description: string
  href: string
  icon: "payment" | "history" | "limits" | "pricing"
}

export type CreditBalanceProps = {
  title: string
  balance: string
  description: string
  autoReloadTitle: string
  autoReloadDescription: string
  autoReloadEnabledLabel: string
  autoReloadDisabledLabel: string
  enableAutoReloadLabel: string
  disableAutoReloadLabel: string
  addFundsLabel: string
  shortcuts: readonly BalanceShortcut[]
}

const shortcutIcons = {
  payment: CreditCard,
  history: FileText,
  limits: Settings2,
  pricing: Gauge,
}

export function CreditBalance({
  title,
  balance,
  description,
  autoReloadTitle,
  autoReloadDescription,
  autoReloadEnabledLabel,
  autoReloadDisabledLabel,
  enableAutoReloadLabel,
  disableAutoReloadLabel,
  addFundsLabel,
  shortcuts,
}: CreditBalanceProps) {
  const [autoReloadEnabled, setAutoReloadEnabled] = useState(false)

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="cash-balance-heading">
        <div className="max-w-2xl">
          <h2 id="cash-balance-heading" className="text-sm font-medium">
            {title}
          </h2>
          <p className="mt-3 text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
            {balance}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-sm border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 gap-3">
            {autoReloadEnabled ? (
              <CircleDollarSign
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0"
              />
            ) : (
              <XCircle
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              />
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium">{autoReloadTitle}</h3>
                <span
                  className={cn(
                    "rounded-sm bg-muted px-2 py-0.5 text-ui-caption",
                    autoReloadEnabled && "bg-secondary text-secondary-foreground"
                  )}
                >
                  {autoReloadEnabled
                    ? autoReloadEnabledLabel
                    : autoReloadDisabledLabel}
                </span>
              </div>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {autoReloadDescription}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant={autoReloadEnabled ? "outline" : "default"}
            className="w-full sm:w-auto"
            onClick={() => setAutoReloadEnabled((enabled) => !enabled)}
          >
            {autoReloadEnabled
              ? disableAutoReloadLabel
              : enableAutoReloadLabel}
          </Button>
        </div>

        <div className="mt-4">
          <Button type="button">{addFundsLabel}</Button>
        </div>
      </section>

      <nav
        aria-label="Balance and billing settings"
        className="grid border-t sm:grid-cols-2"
      >
        {shortcuts.map((shortcut, index) => {
          const Icon = shortcutIcons[shortcut.icon]

          return (
            <a
              key={shortcut.label}
              href={shortcut.href}
              className={cn(
                "group flex min-w-0 items-start gap-4 border-b py-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:px-5",
                index % 2 === 0 && "sm:border-r sm:pl-0"
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-muted">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {shortcut.label}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
