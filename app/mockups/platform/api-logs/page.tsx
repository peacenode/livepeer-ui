import type { Metadata } from "next"
import { RefreshCwIcon, Trash2Icon } from "lucide-react"

import { ApiLogsSection } from "@/components/livepeer-ui/api-logs-section"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import { Button } from "@/components/ui/button"
import {
  getAgentConsolePage,
  type ApiLogsPageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "API Logs",
}

export default async function MockupApiLogsPage() {
  const editorial = await getAgentConsolePage<ApiLogsPageContent>("api-logs")
  if (!editorial?.apiLogs) {
    throw new Error(
      "Required Sanity document agentConsolePage-api-logs is missing or incomplete."
    )
  }

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" className="h-16 rounded-sm px-4">
            <RefreshCwIcon aria-hidden="true" />
            {editorial.apiLogs.refreshLabel}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 rounded-sm px-4"
            disabled
          >
            <Trash2Icon aria-hidden="true" />
            {editorial.apiLogs.clearLabel}
          </Button>
        </div>
      }
    >
      <ApiLogsSection
        searchPlaceholder={editorial.apiLogs.searchPlaceholder}
        errorsOnlyLabel={editorial.apiLogs.errorsOnlyLabel}
        emptyMessage={editorial.apiLogs.emptyMessage}
      />
    </PlatformPage>
  )
}
