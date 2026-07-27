import { PlayIcon, WalletCardsIcon } from "lucide-react"
export function ProtocolPropertiesSection() {
  return <section className="grid gap-10 md:grid-cols-2">
    <div><PlayIcon className="size-5" aria-hidden="true" /><h2 className="mt-3 text-lg font-medium">Any agent can use Livepeer Agent</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Connect the Livepeer Agent MCP and authorize it with OAuth. The agent gets access to this project&rsquo;s workflows without handling a long-lived API credential.</p></div>
    <div><WalletCardsIcon className="size-5" aria-hidden="true" /><h2 className="mt-3 text-lg font-medium">Payment follows execution</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The project pays when a workflow runs. The orchestrator that supplies the GPU earns service fees, while protocol rewards support active network compute.</p></div>
  </section>
}
