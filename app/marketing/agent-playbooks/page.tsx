import type { Metadata } from "next"

import { AgentPlaybookConfigurator } from "@/components/marketing/agent-playbook-configurator"

export const metadata: Metadata = {
  title: "Agent Playbooks",
  description:
    "Configure the Generate, Edit, and Augment video playbooks for the campaign.",
}

export default function AgentPlaybooksPage() {
  return (
    <article className="w-full max-w-5xl pb-20">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Agent Playbooks
        </h1>
        <p className="mt-2 text-balance text-muted-foreground">
          Configure the three core campaign loops, then copy a complete brief
          into your agent. Each playbook can start with a simple prompt and
          accept more source material as the production gets more advanced.
        </p>
      </header>

      <div className="mt-8">
        <AgentPlaybookConfigurator />
      </div>
    </article>
  )
}
