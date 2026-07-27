import type { Metadata } from "next"
import { getPlannerPageContent } from "@/sanity/lib/planner-pages"

import { FootageWorkspace } from "./footage-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlannerPageContent("footage")
  return { title: content.metadataTitle }
}

export default async function FootagePage() {
  const content = await getPlannerPageContent("footage")
  return <FootageWorkspace content={content} />
}
