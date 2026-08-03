import type { Metadata } from "next"

import {
  getPlaybookDocument,
  getSourcePlaybooks,
} from "@/app/mockups/playbooks/daydream-source"
import { AgentLandingPage } from "@/components/livepeer-ui/agent-landing-page"
import {
  getLivepeerOrgPage,
  getLivepeerOrgSite,
} from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Livepeer Agent — Private Beta",
  description:
    "Private-beta marketing page for Livepeer Agent with access to Playbooks and the Agent Console.",
}

export default async function PrivateBetaEarlyAccessAboutPage() {
  const [site, page, playbooks] = await Promise.all([
    getLivepeerOrgSite(),
    getLivepeerOrgPage("livepeer-agent"),
    getSourcePlaybooks(),
  ])
  if (!page.agentContent) {
    throw new Error(
      'Required "agentContent" is missing from "livepeerOrgPage-livepeer-agent".'
    )
  }
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <AgentLandingPage
      capabilities={capabilities}
      content={page.agentContent}
      site={site}
      privateBeta
    />
  )
}
