import {
  demoBillingContent,
  demoBillingInvoices,
  demoBillingPeriod,
  demoInvoiceLabels,
  demoPaymentMethod,
} from "@/app/mockups/_data/billing"
import { BillingWorkspace } from "@/components/livepeer-ui/billing-workspace"

export default function BillingWorkspaceSectionDemo() {
  return (
    <BillingWorkspace
      content={demoBillingContent}
      period={demoBillingPeriod}
      paymentMethod={demoPaymentMethod}
      invoices={demoBillingInvoices}
      invoiceLabels={demoInvoiceLabels}
      managePaymentLabel="Update"
    />
  )
}
