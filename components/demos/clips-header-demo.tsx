"use client"

import { ClipsHeader } from "@/components/livepeer-ui/clips-header"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const content = videoBuddyPageFixture("footage")

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
