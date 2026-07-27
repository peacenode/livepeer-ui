import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

import { StoryboardsWorkspace } from "./storyboards-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("storyboards")
  return { title: content.metadataTitle }
}

export default async function StoryboardsPage() {
  const content = await videoBuddyPageFixture("storyboards")
  return <StoryboardsWorkspace content={content} />
}
