import { LivepeerOrgMenu } from "@/components/livepeer-ui/livepeer-org-menu"
import { livepeerOrgSiteFixture } from "@/components/demos/fixtures/livepeer-org"

export default function LivepeerOrgMenuDemo() {
  return (
    <div className="flex w-full justify-end">
      <LivepeerOrgMenu site={livepeerOrgSiteFixture} />
    </div>
  )
}
