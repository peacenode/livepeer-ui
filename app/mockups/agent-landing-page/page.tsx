import type { Metadata } from "next"

import {
  livepeerOrgAgentFixture,
  livepeerOrgSiteFixture,
} from "@/components/demos/fixtures/livepeer-org"
import { AgentLandingPage as AgentLandingPageView } from "@/components/livepeer-ui/agent-landing-page"

import {
  getPlaybookDocument,
  getSourcePlaybooks,
} from "../playbooks/daydream-source"

export const metadata: Metadata = {
  title: "Agent Landing Page",
  description:
    "Early-access marketing page for Livepeer Agent without public installation instructions.",
}

export default async function InternalTestingAgentLandingPage() {
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <AgentLandingPageView
      capabilities={capabilities}
      content={livepeerOrgAgentFixture}
      site={livepeerOrgSiteFixture}
    />
  )
}
