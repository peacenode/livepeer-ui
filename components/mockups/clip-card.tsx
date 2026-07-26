import Image from "next/image"
import { PlayIcon } from "lucide-react"
import { MediaContextMenu } from "@/app/mockups/videobuddy/media-context-menu"
import type { ClientClip } from "./client-clip"
export function ClipCard({ clip, onDownload, onDuplicate, onRemove }: { clip: ClientClip; onDownload: () => void; onDuplicate: () => void; onRemove: () => void }) {
  return <article className="grid gap-4 py-1 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
    <MediaContextMenu className="relative aspect-video overflow-hidden rounded-xl bg-muted" onOpen={() => undefined} openLabel="Play clip" onDownload={onDownload} onDuplicate={onDuplicate} duplicateLabel="Duplicate clip" onRemove={onRemove} removeLabel="Remove clip">
      <button type="button" className="group relative size-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"><Image src={clip.imageUrl} alt="" fill className="object-cover transition-transform group-hover:scale-105" /><span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20"><span className="flex size-11 items-center justify-center rounded-full bg-background/90"><PlayIcon className="ml-0.5 size-5 fill-current" /></span></span><span className="absolute right-2 bottom-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] text-white">{clip.duration}</span></button>
    </MediaContextMenu>
    <div className="flex min-w-0 flex-col py-1"><p className="truncate text-sm font-medium">{clip.name}</p><p className="mt-2 text-xs text-muted-foreground lg:mt-auto">{clip.uploaded}</p></div>
  </article>
}
