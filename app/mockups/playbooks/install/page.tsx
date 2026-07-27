import type { Metadata } from "next"
import { LivepeerAgentHero } from "@/components/mockups/livepeer-agent-hero"
import { AgentAccessSection } from "@/components/mockups/agent-access-section"
import { AgentCapabilitiesSection } from "@/components/mockups/agent-capabilities-section"
import { PlaybooksCtaSection } from "@/components/mockups/playbooks-cta-section"

import { getPlaybookDocument, getSourcePlaybooks } from "../daydream-source"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Livepeer Agent",
  description:
    "Install Livepeer Agent to use inference playbooks from your coding agent.",
}

export default async function PlaybooksInstallPage() {
  const page = await getLivepeerOrgPage("livepeer-agent")
  if (!page.agentContent)
    throw new Error(
      'Required "agentContent" is missing from "livepeerOrgPage-livepeer-agent".'
    )
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <main>
      <LivepeerAgentHero content={page.agentContent.hero} />
      <AgentAccessSection content={page.agentContent.access} />
      <AgentCapabilitiesSection
        capabilities={capabilities}
        content={page.agentContent.capabilities}
      />
      <PlaybooksCtaSection content={page.agentContent.playbooks} />
    </main>
  )
}
