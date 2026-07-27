import type { Metadata } from "next"

import {
  demoBillingContent,
  demoBillingInvoices,
  demoBillingPeriod,
  demoInvoiceLabels,
  demoPaymentMethod,
} from "@/components/demos/fixtures/billing"
import { BillingWorkspace } from "@/components/mockups/billing-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = { title: "Billing" }

export default function MockupBillingPage() {
  return (
    <PlatformPage title="Billing">
      <BillingWorkspace
        content={demoBillingContent}
        period={demoBillingPeriod}
        paymentMethod={demoPaymentMethod}
        invoices={demoBillingInvoices}
        invoiceLabels={demoInvoiceLabels}
        managePaymentLabel="Update"
      />
    </PlatformPage>
  )
}
