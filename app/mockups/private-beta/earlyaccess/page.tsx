import type { Metadata } from "next"

import { WaitlistMockup } from "@/app/mockups/waitlist/waitlist-mockup"
import { getWaitlistPageContent } from "@/sanity/lib/waitlist-content"

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

export default async function PrivateBetaEarlyAccessPage() {
  const content = await requireWaitlistPageContent()

  return <WaitlistMockup content={content} />
}
