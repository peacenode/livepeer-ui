import type { Metadata } from "next"

import { LivepeerTokenPage } from "@/components/livepeer-ui/livepeer-token-page"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLivepeerOrgPage("token")
  return { title: page.seoTitle, description: page.seoDescription }
}

export default async function TokenPage() {
  const page = await getLivepeerOrgPage("token")
  if (!page.tokenContent)
    throw new Error(
      'Required "tokenContent" is missing from "livepeerOrgPage-token".'
    )
  return <LivepeerTokenPage content={page.tokenContent} />
}
