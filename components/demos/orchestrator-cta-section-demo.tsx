import { OrchestratorCtaSection } from "@/components/livepeer-ui/livepeer-org-landing-sections"
import { livepeerOrgHomeFixture } from "@/app/mockups/_data/livepeer-org"

export default function OrchestratorCtaSectionDemo() {
  return (
    <div className="w-full overflow-hidden">
      <OrchestratorCtaSection content={livepeerOrgHomeFixture.providerCta} />
    </div>
  )
}
