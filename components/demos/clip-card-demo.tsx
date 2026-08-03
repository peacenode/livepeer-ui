"use client"

import { ClipCard } from "@/components/livepeer-ui/clip-card"
import { storyMedia } from "@/app/mockups/videobuddy/media-assets"

export default function ClipCardDemo() {
  return (
    <div className="w-full">
      <ClipCard clip={{ id: 1, name: "salt-flats-wind-test-04.mp4", duration: "0:18", uploaded: "Today, 3:08 PM", imageUrl: storyMedia.saltSignal.wide }} onDownload={() => undefined} onDuplicate={() => undefined} onRemove={() => undefined} />
    </div>
  )
}
