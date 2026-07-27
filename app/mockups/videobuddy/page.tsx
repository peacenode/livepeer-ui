import type { Metadata } from "next"
import { getPlannerPageContent } from "@/sanity/lib/planner-pages"

import { AgentWorkspace } from "./agent-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlannerPageContent("home")
  return { title: content.metadataTitle }
}

export default async function MockupAgentPage() {
  await getPlannerPageContent("home")
  return <AgentWorkspace />
}
