import type { Metadata } from "next"

import { StoryboardsWorkspace } from "./storyboards-workspace"

export const metadata: Metadata = {
  title: "Storyboards - Livepeer",
}

export default function StoryboardsPage() {
  return <StoryboardsWorkspace />
}
