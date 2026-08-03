import { LivepeerOrgHeader } from "@/components/livepeer-ui/livepeer-org-header"
import { livepeerOrgSiteFixture } from "@/app/mockups/_data/livepeer-org"

export default function LivepeerOrgHeaderDemo() {
  return (
    <div className="w-full overflow-hidden border">
      <LivepeerOrgHeader site={livepeerOrgSiteFixture} />
    </div>
  )
}
