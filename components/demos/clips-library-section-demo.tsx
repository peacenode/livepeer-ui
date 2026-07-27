import { FootageWorkspace } from "@/app/mockups/videobuddy/footage/footage-workspace"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

export default function ClipsLibrarySectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <FootageWorkspace content={plannerPageFixture("footage")} />
    </div>
  )
}
