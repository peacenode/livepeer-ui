import {
  LivepeerAgentFeatureSection,
  NetworkHeroSection,
  OrchestratorCtaSection,
} from "@/components/livepeer-ui/livepeer-org-landing-sections"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"

export function PlaybooksWorkspace({
  content,
}: {
  content: NonNullable<LivepeerOrgPage["homeContent"]>
}) {
  return (
    <main>
      <NetworkHeroSection content={content.hero} />
      <LivepeerAgentFeatureSection content={content.agentFeature} />
      <OrchestratorCtaSection content={content.providerCta} />
    </main>
  )
}
