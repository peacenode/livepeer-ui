import { FootageWorkspace } from "@/app/mockups/videobuddy/footage/footage-workspace"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

export default function ClipsLibrarySectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <FootageWorkspace content={videoBuddyPageFixture("footage")} />
    </div>
  )
}
