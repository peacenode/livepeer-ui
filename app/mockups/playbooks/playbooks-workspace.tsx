import {
  LivepeerAgentFeatureSection,
  NetworkHeroSection,
  OrchestratorCtaSection,
} from "@/components/mockups/livepeer-org-landing-sections"
import type { LivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

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
