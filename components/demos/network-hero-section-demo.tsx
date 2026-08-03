import { NetworkHeroSection } from "@/components/livepeer-ui/livepeer-org-landing-sections"
import { livepeerOrgHomeFixture } from "@/app/mockups/_data/livepeer-org"

export default function NetworkHeroSectionDemo() {
  return (
    <div className="w-full overflow-hidden">
      <NetworkHeroSection content={livepeerOrgHomeFixture.hero} />
    </div>
  )
}
