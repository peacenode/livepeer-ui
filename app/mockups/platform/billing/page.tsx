import type { Metadata } from "next"

import {
  demoBillingInvoices,
  demoBillingPeriod,
  demoInvoiceLabels,
  demoPaymentMethod,
} from "@/components/demos/fixtures/billing"
import { BillingWorkspace } from "@/components/mockups/billing-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"
import { notFound } from "next/navigation"
import { getAgentConsoleEditorialPage } from "@/sanity/lib/registry-content"

export const metadata: Metadata = { title: "Billing" }

export default async function MockupBillingPage() {
  const editorial = await getAgentConsoleEditorialPage("billing")
  if (!editorial) notFound()

  return (
    <PlatformPage title={editorial.heading} showHeader={false}>
      <BillingWorkspace
        content={editorial}
        period={demoBillingPeriod}
        paymentMethod={demoPaymentMethod}
        invoices={demoBillingInvoices}
        invoiceLabels={demoInvoiceLabels}
        managePaymentLabel="Update"
      />
    </PlatformPage>
  )
}
