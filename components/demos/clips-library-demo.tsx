"use client"

import { useState } from "react"

import { ClipsLibrary } from "@/components/livepeer-ui/clips-library"
import type { ClientClip as Clip } from "@/components/livepeer-ui/client-clip"
import { storyMedia } from "@/app/mockups/videobuddy/media-assets"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const content = videoBuddyPageFixture("footage")

const initialClips: Clip[] = [
  {
    id: 1,
    name: "salt-flats-wind-test-04.mp4",
    duration: "0:18",
    uploaded: "Today, 3:08 PM",
    imageUrl: storyMedia.saltSignal.wide,
  },
  {
    id: 2,
    name: "lighthouse-weather-reference.mov",
    duration: "0:12",
    uploaded: "Yesterday",
    imageUrl: storyMedia.blackTide.wide,
  },
]

export default function ClipsLibraryDemo() {
  const [clips, setClips] = useState(initialClips)
  return (
    <div className="w-full">
      <ClipsLibrary
        clips={clips}
        emptyStateTitle={content.emptyStateTitle!}
        onDownload={() => undefined}
        onDuplicate={(clip) =>
          setClips((current) => [
            { ...clip, id: Math.max(...current.map((item) => item.id)) + 1 },
            ...current,
          ])
        }
        onRemove={(clip) =>
          setClips((current) => current.filter((item) => item.id !== clip.id))
        }
      />
    </div>
  )
}
