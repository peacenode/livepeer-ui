import { LivepeerAgentPromoCards } from "@/components/livepeer-ui/livepeer-agent-promo-cards"
import { usagePlans } from "@/app/mockups/_data/usage"

export default function LivepeerAgentPromoCardsDemo() {
  return (
    <div className="w-full">
      <LivepeerAgentPromoCards plans={usagePlans} />
    </div>
  )
}
