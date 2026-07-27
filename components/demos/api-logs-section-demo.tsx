import { ApiLogsSection } from "@/components/mockups/api-logs-section"
export default function ApiLogsSectionDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <ApiLogsSection
        searchPlaceholder="Search logs…"
        errorsOnlyLabel="Errors only"
        emptyMessage="No API logs yet. Make an API request to see it here."
      />
    </div>
  )
}
