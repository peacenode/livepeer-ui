import type { Metadata } from "next"

import { MarketingPlanner } from "@/components/marketing/marketing-planner"
import { getMarketingWeeks } from "@/sanity/lib/marketing-plan"

export const metadata: Metadata = {
  title: "Marketing Planner",
  description:
    "Livepeer outreach, constraints, internal meetings, and user interviews.",
}

export default async function MarketingPlannerPage() {
  const weeks = await getMarketingWeeks()
  return <MarketingPlanner weeks={weeks} />
}
