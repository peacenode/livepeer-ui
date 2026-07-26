import { ClientApplicationShell } from "@/components/mockups/client-application-shell"

export default function ClientApplicationShellDemo() {
  return (
    <div className="h-[620px] w-full overflow-hidden">
      <ClientApplicationShell contained>
        <div className="p-6"><p className="text-sm text-muted-foreground">Application content</p></div>
      </ClientApplicationShell>
    </div>
  )
}
