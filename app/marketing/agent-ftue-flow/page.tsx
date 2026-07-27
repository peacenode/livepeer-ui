import type { Metadata } from "next"

import { AgentFtueFlow } from "@/components/marketing/agent-ftue-flow"
import { getAgentRolloutFlow } from "@/sanity/lib/agent-rollout-flow"

export const metadata: Metadata = {
  title: "Agent rollout flows",
  description:
    "A simple view of the Livepeer Agent rollout, screens, required work, and open questions.",
}

export default async function AgentFtueFlowPage() {
  const content = await getAgentRolloutFlow()

  return <AgentFtueFlow content={content} />
}
