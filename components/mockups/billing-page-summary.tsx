"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type BillingPeriodSummary = {
  label: string
  amount: string
  description: string
}

export type BillingPaymentMethod = {
  label: string
  name: string
  description: string
}

export type BillingPageSummaryProps = {
  period: BillingPeriodSummary
  paymentMethod: BillingPaymentMethod
  managePaymentLabel?: string
  managePaymentHref?: string
  onManagePayment?: () => void
}

export function BillingPageSummary({
  period,
  paymentMethod,
  managePaymentLabel = "Update",
  managePaymentHref,
  onManagePayment,
}: BillingPageSummaryProps) {
  const managePaymentAction = managePaymentHref ? (
    <a
      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      href={managePaymentHref}
    >
      {managePaymentLabel}
    </a>
  ) : (
    <Button
      variant="outline"
      size="sm"
      disabled={!onManagePayment}
      onClick={onManagePayment}
    >
      {managePaymentLabel}
    </Button>
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="gap-2 rounded-sm">
        <CardHeader>
          <CardDescription>{period.label}</CardDescription>
          <CardTitle className="text-2xl font-medium tabular-nums">
            {period.amount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{period.description}</p>
        </CardContent>
      </Card>
      <Card className="gap-2 rounded-sm">
        <CardHeader>
          <CardDescription>{paymentMethod.label}</CardDescription>
          <CardTitle className="text-2xl font-medium">
            {paymentMethod.name}
          </CardTitle>
          <CardAction>{managePaymentAction}</CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {paymentMethod.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
