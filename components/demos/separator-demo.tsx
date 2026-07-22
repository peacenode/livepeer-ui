import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Livepeer UI</h4>
        <p className="text-sm text-muted-foreground">
          An open-source component registry.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
