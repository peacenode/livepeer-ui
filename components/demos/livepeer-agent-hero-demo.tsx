import { LivepeerAgentHero } from "@/components/livepeer-ui/livepeer-agent-hero"
import { livepeerOrgAgentFixture } from "@/app/mockups/_data/livepeer-org"

export default function LivepeerAgentHeroDemo() {
  return (
    <div className="w-full overflow-hidden">
      <LivepeerAgentHero content={livepeerOrgAgentFixture.hero} />
    </div>
  )
}
