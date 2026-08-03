import { DailyUsageTable } from "@/components/livepeer-ui/daily-usage-table"
import { dailyUsageRows, usageContent } from "@/app/mockups/_data/usage"
export default function DailyUsageTableDemo() {
  return (
    <DailyUsageTable
      title={usageContent.dailyUsageTitle}
      rows={dailyUsageRows}
      emptyMessage={usageContent.dailyUsageEmptyMessage}
    />
  )
}
