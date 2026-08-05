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
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="cash-balance-heading" className="text-sm font-medium">
              {title}
            </h2>
            <p className="mt-2 text-3xl leading-none font-normal tracking-tight tabular-nums sm:text-4xl">
              {balance}
            </p>
          </div>
          <Button type="button">{addFundsLabel}</Button>
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-sm bg-muted p-4 sm:p-6">
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
            className="w-full sm:w-auto sm:self-start"
            onClick={() => setAutoReloadEnabled((enabled) => !enabled)}
          >
            {autoReloadEnabled
              ? disableAutoReloadLabel
              : enableAutoReloadLabel}
          </Button>
        </div>

      </section>

      <nav
        aria-label="Balance and billing settings"
        className="grid gap-3 sm:grid-cols-2"
      >
        {shortcuts.map((shortcut) => {
          const Icon = shortcutIcons[shortcut.icon]

          return (
            <a
              key={shortcut.label}
              href={shortcut.href}
              className="group flex min-w-0 items-start gap-4 rounded-sm bg-muted p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-background">
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
