import type { Metadata } from "next"

import { MarketingPlanner } from "@/components/marketing/marketing-planner"
import { getMarketingWeeks } from "@/sanity/lib/marketing-plan"

export const metadata: Metadata = {
  title: "Planner weeks",
}

export default async function PlannerWeeksPage() {
  const weeks = await getMarketingWeeks()
  return <MarketingPlanner weeks={weeks} />
}
