import { LivepeerOrgFooter } from "@/components/livepeer-ui/livepeer-org-footer"
import { livepeerOrgSiteFixture } from "@/components/demos/fixtures/livepeer-org"

export default function LivepeerOrgFooterDemo() {
  return (
    <div className="w-full overflow-hidden border">
      <LivepeerOrgFooter site={livepeerOrgSiteFixture} />
    </div>
  )
}
