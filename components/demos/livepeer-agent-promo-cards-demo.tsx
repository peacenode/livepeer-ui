import { LivepeerAgentPromoCards } from "@/components/mockups/livepeer-agent-promo-cards"
import { usagePlans } from "@/components/demos/fixtures/usage"

export default function LivepeerAgentPromoCardsDemo() {
  return (
    <div className="w-full">
      <LivepeerAgentPromoCards plans={usagePlans} />
    </div>
  )
}
