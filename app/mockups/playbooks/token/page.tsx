import type { Metadata } from "next"

import { LivepeerTokenPage } from "@/components/livepeer-ui/livepeer-token-page"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLivepeerOrgPage("token")
  return { title: page.seoTitle, description: page.seoDescription }
}

export default async function TokenPage() {
  const [page, computePage] = await Promise.all([
    getLivepeerOrgPage("token"),
    getLivepeerOrgPage("provide-gpu-compute"),
  ])
  if (!page.tokenContent)
    throw new Error(
      'Required "tokenContent" is missing from "livepeerOrgPage-token".'
    )
  if (!computePage.earnContent)
    throw new Error(
      'Required "earnContent" is missing from "livepeerOrgPage-provide-gpu-compute".'
    )
  return (
    <LivepeerTokenPage
      content={page.tokenContent}
      stakeContent={computePage.earnContent.stake}
    />
  )
}
