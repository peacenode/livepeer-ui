import { defineQuery } from "next-sanity"

import fallbackContent from "@/content/faq.json"
import { sanityClient } from "@/sanity/lib/client"

export type FaqItem = {
  _key: string
  question: string
  answer: string
}

export type FaqPageContent = {
  title: string
  subtitle: string
  items: FaqItem[]
}

const query = defineQuery(`
  *[_type == "faqPageContent" && _id == "faqPageContent"][0] {
    title,
    subtitle,
    items[] { _key, question, answer }
  }
`)

const fallback: FaqPageContent = fallbackContent

export async function getFaqPageContent(): Promise<FaqPageContent> {
  try {
    const content = await sanityClient.fetch<FaqPageContent | null>(
      query,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["faq-page-content"],
        },
      }
    )

    return content?.items?.length ? content : fallback
  } catch {
    return fallback
  }
}
