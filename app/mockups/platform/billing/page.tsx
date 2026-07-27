import type { Metadata } from "next"

import {
  demoBillingInvoices,
  demoBillingPeriod,
  demoInvoiceLabels,
  demoPaymentMethod,
} from "@/components/demos/fixtures/billing"
import { BillingWorkspace } from "@/components/mockups/billing-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"
import {
  getAgentConsolePage,
  type BillingPageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = { title: "Billing" }

export default async function MockupBillingPage() {
  const editorial = await getAgentConsolePage<BillingPageContent>("billing")
  if (!editorial?.billing) {
    throw new Error(
      "Required Sanity document agentConsolePage-billing is missing or incomplete."
    )
  }

  return (
    <PlatformPage title={editorial.heading} showHeader={false}>
      <BillingWorkspace
        content={{
          heading: editorial.heading,
          description: editorial.description,
          ctas: editorial.billing.ctas,
        }}
        headingLevel="h1"
        period={demoBillingPeriod}
        paymentMethod={demoPaymentMethod}
        invoices={demoBillingInvoices}
        invoiceLabels={demoInvoiceLabels}
        managePaymentLabel={editorial.billing.managePaymentLabel}
      />
    </PlatformPage>
  )
}
