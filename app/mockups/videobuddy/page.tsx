import type { Metadata } from "next"

import { AgentWorkspace } from "./agent-workspace"

export const metadata: Metadata = {
  title: "Runner - Livepeer",
}

export default function MockupAgentPage() {
  return <AgentWorkspace />
}
