"use client"

import type { MouseEventHandler } from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type LivepeerAgentPromoPlan = {
  id: string
  name: string
  credits: string
  creditsLabel: string
  description: string
  ctaLabel: string
  href: string
  recommendedLabel?: string
}

export type LivepeerAgentPromoCardsProps = {
  plans: readonly LivepeerAgentPromoPlan[]
  onPlanSelect?: (plan: LivepeerAgentPromoPlan) => void
}

export function LivepeerAgentPromoCards({
  plans,
  onPlanSelect,
}: LivepeerAgentPromoCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => {
        const recommended = Boolean(plan.recommendedLabel)
        const handleClick: MouseEventHandler<HTMLAnchorElement> | undefined =
          onPlanSelect ? () => onPlanSelect(plan) : undefined

        return (
          <div
            key={plan.id}
            className={
              recommended
                ? "relative flex min-h-64 flex-col rounded-sm border border-emerald-500 p-6"
                : "flex min-h-64 flex-col rounded-sm border p-6"
            }
          >
            {plan.recommendedLabel ? (
              <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 text-white">
                {plan.recommendedLabel}
              </Badge>
            ) : null}
            <p
              className={
                recommended
                  ? "text-sm font-medium text-emerald-700"
                  : "text-sm font-medium text-muted-foreground"
              }
            >
              {plan.name}
            </p>
            <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
              {plan.credits}{" "}
              <span className="text-lg font-normal text-muted-foreground">
                {plan.creditsLabel}
              </span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <Button
              variant={recommended ? "secondary" : "outline"}
              size="lg"
              nativeButton={false}
              render={<a href={plan.href} onClick={handleClick} />}
              className={
                recommended
                  ? "mt-auto h-16 w-full rounded-sm border border-emerald-500 bg-emerald-500 px-4 text-white hover:bg-emerald-500"
                  : "mt-auto h-16 w-full rounded-sm px-4"
              }
              style={
                recommended
                  ? {
                      backgroundImage:
                        "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                    }
                  : undefined
              }
            >
              {plan.ctaLabel}
              <ArrowRightIcon aria-hidden="true" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
