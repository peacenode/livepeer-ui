import type { Metadata } from "next"

import { ConstructionPage } from "@/components/marketing/construction-page"

export const metadata: Metadata = {
  title: "Agent Playbooks",
}

export default function AgentPlaybooksPage() {
  return <ConstructionPage title="Agent Playbooks" />
}
