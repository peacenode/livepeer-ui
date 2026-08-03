import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/app/mockups/_data/videobuddy-pages"

import { ProjectsWorkspace } from "./projects-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("projects")
  return { title: content.metadataTitle }
}

export default async function ProjectsPage() {
  const content = await videoBuddyPageFixture("projects")
  return <ProjectsWorkspace content={content} />
}
