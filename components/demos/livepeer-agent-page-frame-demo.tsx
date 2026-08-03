import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import { Button } from "@/components/ui/button"

export default function LivepeerAgentPageFrameDemo() {
  return (
    <div className="h-[420px] w-full overflow-hidden">
      <PlatformPage title="Usage" description="Review project activity." action={<Button>Export</Button>}>
        <div className="rounded-sm border border-dashed p-8 text-sm text-muted-foreground">
          Page section content
        </div>
      </PlatformPage>
    </div>
  )
}
