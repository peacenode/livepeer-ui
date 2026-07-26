import type { Metadata } from "next"

import { AgentWorkspace } from "./agent-workspace"

export const metadata: Metadata = {
  title: "Livepeer Agent",
}

export default function MockupAgentPage() {
  return <AgentWorkspace />
}
