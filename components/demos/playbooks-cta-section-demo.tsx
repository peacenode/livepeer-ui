import { PlaybooksCtaSection } from "@/components/livepeer-ui/playbooks-cta-section"
import { livepeerOrgAgentFixture } from "@/app/mockups/_data/livepeer-org"

export default function PlaybooksCtaSectionDemo() {
  return <PlaybooksCtaSection content={livepeerOrgAgentFixture.playbooks} />
}
