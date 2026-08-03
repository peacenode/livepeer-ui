import { PlaybooksCtaSection } from "@/components/livepeer-ui/playbooks-cta-section"
import { livepeerOrgAgentFixture } from "@/components/demos/fixtures/livepeer-org"

export default function PlaybooksCtaSectionDemo() {
  return <PlaybooksCtaSection content={livepeerOrgAgentFixture.playbooks} />
}
