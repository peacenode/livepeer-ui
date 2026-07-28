import type { Metadata } from "next"

import {
  getPlaybookDocument,
  getSourcePlaybooks,
} from "@/app/mockups/playbooks/daydream-source"
import {
  livepeerOrgAgentFixture,
  livepeerOrgSiteFixture,
} from "@/components/demos/fixtures/livepeer-org"
import { AgentLandingPage } from "@/components/mockups/agent-landing-page"

export const metadata: Metadata = {
  title: "Livepeer Agent — Private Beta",
  description:
    "Private-beta marketing page for Livepeer Agent with access to Playbooks and the Agent Console.",
}

export default async function PrivateBetaLandingPage() {
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <AgentLandingPage
      capabilities={capabilities}
      content={livepeerOrgAgentFixture}
      site={livepeerOrgSiteFixture}
      privateBeta
    />
  )
}
