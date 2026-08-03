"use client"

import { MediaContextMenu } from "@/components/livepeer-ui/media-context-menu"

export default function MediaContextMenuDemo() {
  return (
    <MediaContextMenu
      onOpen={() => undefined}
      onDownload={() => undefined}
      onDuplicate={() => undefined}
      onRemove={() => undefined}
    >
      <div className="flex aspect-video w-80 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
        Right-click this media
      </div>
    </MediaContextMenu>
  )
}
