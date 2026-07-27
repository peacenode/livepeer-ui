import {
  demoBillingInvoices,
  demoBillingPeriod,
  demoInvoiceLabels,
  demoPaymentMethod,
} from "@/components/demos/fixtures/billing"
import { BillingWorkspace } from "@/components/mockups/billing-workspace"

export default function BillingWorkspaceSectionDemo() {
  return (
    <BillingWorkspace
      period={demoBillingPeriod}
      paymentMethod={demoPaymentMethod}
      invoices={demoBillingInvoices}
      invoiceLabels={demoInvoiceLabels}
    />
  )
}
