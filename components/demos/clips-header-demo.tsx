"use client"

import { ClipsHeader } from "@/components/mockups/clips-header"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

const content = plannerPageFixture("footage")

export default function ClipsHeaderDemo() {
  return (
    <div className="w-full">
      <ClipsHeader
        title={content.heading!}
        actionLabel={content.primaryActionLabel!}
        onUpload={() => undefined}
      />
    </div>
  )
}
