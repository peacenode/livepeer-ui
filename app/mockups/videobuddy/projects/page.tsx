import type { Metadata } from "next"
import { getPlannerPageContent } from "@/sanity/lib/planner-pages"

import { ProjectsWorkspace } from "./projects-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlannerPageContent("projects")
  return { title: content.metadataTitle }
}

export default async function ProjectsPage() {
  const content = await getPlannerPageContent("projects")
  return <ProjectsWorkspace content={content} />
}
