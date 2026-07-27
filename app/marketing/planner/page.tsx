import type { Metadata } from "next"

import { PlannerContent } from "@/components/marketing/planner-content"
import { getPlannerContent } from "@/sanity/lib/planner-content"

export const metadata: Metadata = {
  title: "Marketing Planner",
  description:
    "Livepeer outreach, constraints, internal meetings, and user interviews.",
}

export default async function MarketingPlannerPage() {
  const content = await getPlannerContent()

  return <PlannerContent {...content} />
}
