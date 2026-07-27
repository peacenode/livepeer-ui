import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

import { AgentWorkspace } from "./agent-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("home")
  return { title: content.metadataTitle }
}

export default async function MockupAgentPage() {
  await videoBuddyPageFixture("home")
  return <AgentWorkspace />
}
