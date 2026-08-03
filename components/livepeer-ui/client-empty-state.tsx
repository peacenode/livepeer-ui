import type { LucideIcon } from "lucide-react"

export function ClientEmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description?: string }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
      <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
      <p className="mt-3 text-sm font-medium">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}
