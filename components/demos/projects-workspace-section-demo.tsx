import { ProjectsWorkspace } from "@/app/mockups/videobuddy/projects/projects-workspace"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

export default function ProjectsWorkspaceSectionDemo() {
  return (
    <div className="h-[700px] w-full overflow-hidden">
      <ProjectsWorkspace content={plannerPageFixture("projects")} />
    </div>
  )
}
