import type { Metadata } from "next"

import { AgentWorkspace } from "./agent-workspace"

export const metadata: Metadata = {
  title: "VideoBuddy - Livepeer",
}

export default function MockupAgentPage() {
  return <AgentWorkspace />
}
