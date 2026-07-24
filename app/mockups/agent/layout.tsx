import { AgentShell } from "./agent-shell"

export default function AgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AgentShell>{children}</AgentShell>
}
