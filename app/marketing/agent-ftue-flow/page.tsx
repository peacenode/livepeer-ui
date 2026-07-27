import type { Metadata } from "next"

import { AgentFtueFlow } from "@/components/marketing/agent-ftue-flow"

export const metadata: Metadata = {
  title: "Agent rollout flows",
  description:
    "A simple view of the Livepeer Agent rollout, screens, required work, and open questions.",
}

export default function AgentFtueFlowPage() {
  return <AgentFtueFlow />
}
