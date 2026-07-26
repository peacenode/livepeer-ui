import { cn } from "@/lib/utils"

export function ProductComponentPreview({
  path,
  title,
  className,
}: {
  path: string
  title: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border bg-background",
        className
      )}
    >
      <iframe
        src={path}
        title={`${title} preview`}
        className="block min-h-[350px] w-full border-0 bg-background"
      />
    </div>
  )
}
