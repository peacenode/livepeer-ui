import {
  demoBillingPeriod,
  demoPaymentMethod,
} from "@/components/demos/fixtures/billing"
import { BillingPageSummary } from "@/components/mockups/billing-page-summary"

export default function BillingPageSummaryDemo() {
  return (
    <BillingPageSummary
      period={demoBillingPeriod}
      paymentMethod={demoPaymentMethod}
    />
  )
}
