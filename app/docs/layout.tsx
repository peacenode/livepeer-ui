import { RegistryShell } from "@/components/docs/registry-shell"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RegistryShell>{children}</RegistryShell>
}
