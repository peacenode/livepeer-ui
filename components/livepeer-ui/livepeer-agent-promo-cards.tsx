"use client"

import type { MouseEventHandler } from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type LivepeerAgentPromoPlan = {
  id: string
  name: string
  price: string
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
                ? "relative flex min-h-64 flex-col rounded-sm border border-foreground p-6"
                : "flex min-h-64 flex-col rounded-sm border p-6"
            }
          >
            {plan.recommendedLabel ? (
              <Badge className="absolute top-0 right-6 -translate-y-1/2">
                {plan.recommendedLabel}
              </Badge>
            ) : null}
            <p
              className={
                recommended
                  ? "text-sm font-semibold text-foreground"
                  : "text-sm font-medium text-muted-foreground"
              }
            >
              {plan.name}
            </p>
            <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
              {plan.price}
            </p>
            <p className="mt-1 text-lg font-normal text-muted-foreground">
              <span className="tabular-nums">{plan.credits}</span>{" "}
              {plan.creditsLabel}
            </p>
            <p className="mt-4 mb-6 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <Button
              variant={recommended ? "default" : "outline"}
              size="lg"
              nativeButton={false}
              render={<a href={plan.href} onClick={handleClick} />}
              className="mt-auto h-16 w-full rounded-sm px-4"
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
