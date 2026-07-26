export const protocolRequestSteps = [
  { title: "Intent", description: "A person, agent, or application asks Livepeer Agent to create or transform media." },
  { title: "Workflow", description: "Livepeer Agent selects the saved workflow and validates its inputs." },
  { title: "Execution", description: "An orchestrator runs the workflow on its GPU and returns the output." },
  { title: "Result", description: "Livepeer Agent returns the output to the CLI, connected agent, or application." },
]
export function ProtocolRequestFlowSection({ steps = protocolRequestSteps }: { steps?: typeof protocolRequestSteps }) {
  return <section><h2 className="text-lg font-medium">How a Livepeer Agent request moves</h2><div className="mt-4 border-y">
    {steps.map((step, index) => <div key={step.title} className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[48px_140px_1fr] sm:items-baseline"><span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span><h3 className="text-sm font-medium">{step.title}</h3><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{step.description}</p></div>)}
  </div></section>
}
