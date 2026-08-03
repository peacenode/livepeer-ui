import { ResourceUsageTable } from "@/components/livepeer-ui/resource-usage-table"
import {
  resourceUsageRows,
  usageContent,
} from "@/components/demos/fixtures/usage"
export default function ResourceUsageTableDemo() {
  return (
    <ResourceUsageTable
      title={usageContent.resourceUsageTitle}
      rows={resourceUsageRows}
      emptyMessage={usageContent.resourceUsageEmptyMessage}
    />
  )
}
