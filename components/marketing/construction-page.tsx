import { ConstructionIcon } from "lucide-react"

export function ConstructionPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[calc(100svh-7.5rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <ConstructionIcon
          className="size-10 text-muted-foreground"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h1 className="text-2xl font-medium text-balance">{title}</h1>
      </div>
    </div>
  )
}
