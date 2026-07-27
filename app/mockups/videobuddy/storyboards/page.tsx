import type { Metadata } from "next"
import { getPlannerPageContent } from "@/sanity/lib/planner-pages"

import { StoryboardsWorkspace } from "./storyboards-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlannerPageContent("storyboards")
  return { title: content.metadataTitle }
}

export default async function StoryboardsPage() {
  const content = await getPlannerPageContent("storyboards")
  return <StoryboardsWorkspace content={content} />
}
