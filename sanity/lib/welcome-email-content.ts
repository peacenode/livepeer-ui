import { defineQuery } from "next-sanity"

import type { WelcomeEmailContent } from "@/components/livepeer-ui/welcome-email"
import { sanityClient } from "@/sanity/lib/client"

const welcomeEmailContentQuery = defineQuery(`
  *[_type == "welcomeEmailContent" && _id == "welcomeEmailContent-private-beta"][0] {
    heading,
    "paragraphs": coalesce(paragraphs, []),
    ctaLabel,
    ctaHref,
    signoff,
    sender
  }
`)

export async function getWelcomeEmailContent(): Promise<WelcomeEmailContent> {
  const content = await sanityClient.fetch<WelcomeEmailContent | null>(
    welcomeEmailContentQuery,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["welcome-email-content"],
      },
    }
  )

  if (!content) {
    throw new Error(
      'Required Sanity document "welcomeEmailContent-private-beta" is missing.'
    )
  }

  return content
}
