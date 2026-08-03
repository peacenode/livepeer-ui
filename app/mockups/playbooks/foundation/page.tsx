import type { Metadata } from "next"

import { LivepeerFoundationPage } from "@/components/livepeer-ui/livepeer-foundation-page"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLivepeerOrgPage("foundation")
  return { title: page.seoTitle, description: page.seoDescription }
}

export default async function FoundationPage() {
  const page = await getLivepeerOrgPage("foundation")
  if (!page.foundationContent)
    throw new Error(
      'Required "foundationContent" is missing from "livepeerOrgPage-foundation".'
    )
  return <LivepeerFoundationPage content={page.foundationContent} />
}
