import type { Metadata } from "next"

import { getWaitlistPageContent } from "@/sanity/lib/waitlist-content"

import { WaitlistMockup } from "./waitlist-mockup"

async function requireWaitlistPageContent() {
  const content = await getWaitlistPageContent()

  if (!content) {
    throw new Error(
      'Missing required Sanity document "waitlistPageContent-waitlist"'
    )
  }

  return content
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await requireWaitlistPageContent()

  return content.metadata
}

export default async function WaitlistPage() {
  const content = await requireWaitlistPageContent()

  return <WaitlistMockup content={content} />
}
