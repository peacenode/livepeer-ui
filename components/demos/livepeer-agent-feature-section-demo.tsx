import { LivepeerAgentFeatureSection } from "@/components/livepeer-ui/livepeer-org-landing-sections"
import { livepeerOrgHomeFixture } from "@/components/demos/fixtures/livepeer-org"

export default function LivepeerAgentFeatureSectionDemo() {
  return (
    <div className="w-full overflow-hidden">
      <LivepeerAgentFeatureSection
        content={livepeerOrgHomeFixture.agentFeature}
      />
    </div>
  )
}
