import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

import { FootageWorkspace } from "./footage-workspace"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("footage")
  return { title: content.metadataTitle }
}

export default async function FootagePage() {
  const content = await videoBuddyPageFixture("footage")
  return <FootageWorkspace content={content} />
}
