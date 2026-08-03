"use client"

import { useState } from "react"

import { storyMedia } from "../media-assets"
import { downloadMedia } from "@/components/livepeer-ui/media-context-menu"
import { ClipsHeader, ClipsLibrary, type Clip } from "./clips-components"
import type { VideoBuddyPageContent } from "@/components/livepeer-ui/contracts"

const initialFootage: Clip[] = [
  {
    id: 3,
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
  {
    id: 1,
    name: "pool-rehearsal-wide.mp4",
    duration: "0:24",
    uploaded: "Jul 21",
    imageUrl: storyMedia.afterHours.wide,
  },
]

export function FootageWorkspace({ content }: { content: VideoBuddyPageContent }) {
  const [footage, setFootage] = useState(initialFootage)
  function addFootage(files: FileList | null) {
    if (!files?.length) return
    const additions = Array.from(files)
      .filter((file) => file.type.startsWith("video/"))
      .map((file, index) => ({
        id: (footage[0]?.id ?? 0) + index + 1,
        name: file.name,
        duration: "0:00",
        uploaded: "Just now",
        imageUrl: storyMedia.saltSignal.wide,
      }))
    setFootage((current) => [...additions.reverse(), ...current])
  }
  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:h-dvh">
      <section className="min-h-0 flex-1 overflow-y-auto overscroll-none">
        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <ClipsHeader
            title={content.heading!}
            actionLabel={content.primaryActionLabel!}
            onUpload={addFootage}
          />
          <ClipsLibrary
            clips={footage}
            emptyStateTitle={content.emptyStateTitle!}
            onDownload={(clip) => downloadMedia(clip.imageUrl, clip.name)}
            onDuplicate={(clip) =>
              setFootage((current) => [
                {
                  ...clip,
                  id: Math.max(...current.map((entry) => entry.id)) + 1,
                  name: `Copy of ${clip.name}`,
                  uploaded: "Just now",
                },
                ...current,
              ])
            }
            onRemove={(clip) =>
              setFootage((current) =>
                current.filter((entry) => entry.id !== clip.id)
              )
            }
          />
        </div>
      </section>
    </main>
  )
}
