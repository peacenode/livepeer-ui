import { StoryboardsWorkspace } from "@/app/mockups/videobuddy/storyboards/storyboards-workspace"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

export default function StoryboardsWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <StoryboardsWorkspace content={plannerPageFixture("storyboards")} />
    </div>
  )
}
