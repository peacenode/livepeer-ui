import { NetworkHeroSection } from "@/components/mockups/livepeer-org-landing-sections"
import { livepeerOrgHomeFixture } from "@/components/demos/fixtures/livepeer-org"

export default function NetworkHeroSectionDemo() {
  return (
    <div className="w-full overflow-hidden">
      <NetworkHeroSection content={livepeerOrgHomeFixture.hero} />
    </div>
  )
}
