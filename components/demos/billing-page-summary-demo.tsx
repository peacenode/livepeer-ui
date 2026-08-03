import {
  demoBillingPeriod,
  demoPaymentMethod,
} from "@/app/mockups/_data/billing"
import { BillingPageSummary } from "@/components/livepeer-ui/billing-page-summary"

export default function BillingPageSummaryDemo() {
  return (
    <BillingPageSummary
      period={demoBillingPeriod}
      paymentMethod={demoPaymentMethod}
      managePaymentLabel="Update"
    />
  )
}
