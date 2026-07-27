import { ProjectsWorkspace } from "@/app/mockups/videobuddy/projects/projects-workspace"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

export default function ProjectsWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <ProjectsWorkspace content={videoBuddyPageFixture("projects")} />
    </div>
  )
}
