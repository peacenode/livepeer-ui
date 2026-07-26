import type { Metadata } from "next"

import { UsageWorkspace } from "@/components/mockups/usage-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = { title: "Usage" }

export default function MockupUsagePage() {
  return (
    <PlatformPage title="Usage" variant="plain">
      <UsageWorkspace />
    </PlatformPage>
  )
}
