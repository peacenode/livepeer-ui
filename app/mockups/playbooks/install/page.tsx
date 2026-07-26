import type { Metadata } from "next"
import { LivepeerAgentHero } from "@/components/mockups/livepeer-agent-hero"
import { AgentAccessSection } from "@/components/mockups/agent-access-section"
import { AgentCapabilitiesSection } from "@/components/mockups/agent-capabilities-section"
import { PlaybooksCtaSection } from "@/components/mockups/playbooks-cta-section"

import { getPlaybookDocument, getSourcePlaybooks } from "../daydream-source"

export const metadata: Metadata = {
  title: "Livepeer Agent",
  description:
    "Install Livepeer Agent to use inference playbooks from your coding agent.",
}

export default async function PlaybooksInstallPage() {
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <main>
      <LivepeerAgentHero />
      <AgentAccessSection />
      <AgentCapabilitiesSection capabilities={capabilities} />
      <PlaybooksCtaSection />
    </main>
  )
}
