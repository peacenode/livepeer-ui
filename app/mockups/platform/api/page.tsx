import type { Metadata } from "next"

import { ApiKeyActions } from "@/components/mockups/api-key-actions"
import { ApiKeysSection } from "@/components/mockups/api-keys-section"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = { title: "API" }

export default function MockupApiPage() {
  return (
    <PlatformPage
      title="API Keys"
      description="Create and manage the keys used to authenticate API requests."
      action={<ApiKeyActions />}
    >
      <ApiKeysSection />
    </PlatformPage>
  )
}
