import type { Metadata } from "next"

import { EntityPage } from "../entity-page"

export const metadata: Metadata = {
  title: "Storyboards - Livepeer",
}

export default function StoryboardsPage() {
  return <EntityPage type="storyboards" />
}
