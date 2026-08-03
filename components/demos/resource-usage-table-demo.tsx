import { ResourceUsageTable } from "@/components/livepeer-ui/resource-usage-table"
import {
  resourceUsageRows,
  usageContent,
} from "@/app/mockups/_data/usage"
export default function ResourceUsageTableDemo() {
  return (
    <ResourceUsageTable
      title={usageContent.resourceUsageTitle}
      rows={resourceUsageRows}
      emptyMessage={usageContent.resourceUsageEmptyMessage}
    />
  )
}
