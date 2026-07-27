import type { Metadata } from "next"

import { BillingWorkspace } from "@/components/mockups/billing-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = { title: "Billing" }

export default function MockupBillingPage() {
  return (
    <PlatformPage title="Billing">
      <BillingWorkspace />
    </PlatformPage>
  )
}
