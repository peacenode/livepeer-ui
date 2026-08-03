import type { Metadata } from "next"

import { ApiKeyActions } from "@/components/livepeer-ui/api-key-actions"
import { ApiKeysSection } from "@/components/livepeer-ui/api-keys-section"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import {
  getAgentConsolePage,
  type ApiKeysPageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = { title: "API" }

export default async function MockupApiPage() {
  const editorial = await getAgentConsolePage<ApiKeysPageContent>("api-keys")
  if (!editorial?.apiKeys) {
    throw new Error(
      "Required Sanity document agentConsolePage-api-keys is missing or incomplete."
    )
  }

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      action={<ApiKeyActions content={editorial.apiKeys} />}
    >
      <ApiKeysSection
        filterPlaceholder={editorial.apiKeys.filterPlaceholder}
        paginationLabel={editorial.apiKeys.paginationLabel}
      />
    </PlatformPage>
  )
}
