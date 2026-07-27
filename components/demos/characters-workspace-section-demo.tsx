import { CharactersWorkspace } from "@/app/mockups/videobuddy/characters/characters-workspace"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

export default function CharactersWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <CharactersWorkspace content={plannerPageFixture("characters")} />
    </div>
  )
}
