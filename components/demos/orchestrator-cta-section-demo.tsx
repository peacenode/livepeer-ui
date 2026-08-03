import { OrchestratorCtaSection } from "@/components/livepeer-ui/livepeer-org-landing-sections"
import { livepeerOrgHomeFixture } from "@/components/demos/fixtures/livepeer-org"

export default function OrchestratorCtaSectionDemo() {
  return (
    <div className="w-full overflow-hidden">
      <OrchestratorCtaSection content={livepeerOrgHomeFixture.providerCta} />
    </div>
  )
}
