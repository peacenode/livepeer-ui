import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/app/mockups/_data/videobuddy-pages"

import { CharactersWorkspace } from "./characters-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("characters")
  return { title: content.metadataTitle }
}

export default async function CharactersPage() {
  const content = await videoBuddyPageFixture("characters")
  return <CharactersWorkspace content={content} />
}
