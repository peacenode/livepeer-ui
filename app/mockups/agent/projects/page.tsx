import type { Metadata } from "next"

import { ProjectsWorkspace } from "./projects-workspace"

export const metadata: Metadata = {
  title: "Projects - Livepeer",
}

export default function ProjectsPage() {
  return <ProjectsWorkspace />
}
