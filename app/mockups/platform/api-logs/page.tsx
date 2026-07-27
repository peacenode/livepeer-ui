import type { Metadata } from "next"
import { RefreshCwIcon, Trash2Icon } from "lucide-react"

import { ApiLogsSection } from "@/components/mockups/api-logs-section"
import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "API Logs",
}

export default function MockupApiLogsPage() {
  return (
    <PlatformPage
      title="API Logs"
      description="View your 100 most recent API requests and errors."
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-16 rounded-sm px-4"
          >
            <RefreshCwIcon aria-hidden="true" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 rounded-sm px-4"
            disabled
          >
            <Trash2Icon aria-hidden="true" />
            Clear logs
          </Button>
        </div>
      }
    >
      <ApiLogsSection />
    </PlatformPage>
  )
}
