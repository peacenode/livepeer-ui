import { FilmIcon } from "lucide-react"
import { ClientEmptyState } from "./client-empty-state"
import { ClipCard } from "./clip-card"
import type { ClientClip } from "./client-clip"
export function ClipsLibrary({
  clips,
  emptyStateTitle,
  onDownload,
  onDuplicate,
  onRemove,
}: {
  clips: ClientClip[]
  emptyStateTitle: string
  onDownload: (clip: ClientClip) => void
  onDuplicate: (clip: ClientClip) => void
  onRemove: (clip: ClientClip) => void
}) {
  if (!clips.length)
    return <ClientEmptyState icon={FilmIcon} title={emptyStateTitle} />
  return (
    <div className="space-y-2 py-6">
      {clips.map((clip) => (
        <ClipCard
          key={clip.id}
          clip={clip}
          onDownload={() => onDownload(clip)}
          onDuplicate={() => onDuplicate(clip)}
          onRemove={() => onRemove(clip)}
        />
      ))}
    </div>
  )
}
