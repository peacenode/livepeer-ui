import type { Metadata } from "next"
import { getPlannerPageContent } from "@/sanity/lib/planner-pages"

import { CharactersWorkspace } from "./characters-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlannerPageContent("characters")
  return { title: content.metadataTitle }
}

export default async function CharactersPage() {
  const content = await getPlannerPageContent("characters")
  return <CharactersWorkspace content={content} />
}
