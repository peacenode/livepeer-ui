import { StoryboardsWorkspace } from "@/app/mockups/videobuddy/storyboards/storyboards-workspace"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

export default function StoryboardsWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <StoryboardsWorkspace content={videoBuddyPageFixture("storyboards")} />
    </div>
  )
}
