import { CharactersWorkspace } from "@/app/mockups/videobuddy/characters/characters-workspace"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

export default function CharactersWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <CharactersWorkspace content={videoBuddyPageFixture("characters")} />
    </div>
  )
}
