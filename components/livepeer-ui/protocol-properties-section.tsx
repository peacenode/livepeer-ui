import { PlayIcon, WalletCardsIcon } from "lucide-react"
export function ProtocolPropertiesSection({
  agentHeading,
  agentDescription,
  paymentHeading,
  paymentDescription,
}: {
  agentHeading: string
  agentDescription: string
  paymentHeading: string
  paymentDescription: string
}) {
  return (
    <section className="grid gap-10 md:grid-cols-2">
      <div>
        <PlayIcon className="size-5" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-medium">{agentHeading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {agentDescription}
        </p>
      </div>
      <div>
        <WalletCardsIcon className="size-5" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-medium">{paymentHeading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {paymentDescription}
        </p>
      </div>
    </section>
  )
}
