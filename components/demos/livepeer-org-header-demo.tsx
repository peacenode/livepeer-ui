import { LivepeerOrgHeader } from "@/components/mockups/livepeer-org-header"
import { livepeerOrgSiteFixture } from "@/components/demos/fixtures/livepeer-org"

export default function LivepeerOrgHeaderDemo() {
  return (
    <div className="w-full overflow-hidden border">
      <LivepeerOrgHeader site={livepeerOrgSiteFixture} />
    </div>
  )
}
