import { EcosystemCatalog } from "@/app/mockups/playbooks/ecosystem/ecosystem-catalog"
import { livepeerOrgEcosystemFixture } from "@/app/mockups/_data/livepeer-org"

export default function EcosystemCatalogDemo() {
  return (
    <div className="w-full p-4 sm:p-6">
      <EcosystemCatalog
        apps={livepeerOrgEcosystemFixture.apps}
        searchPlaceholder={livepeerOrgEcosystemFixture.searchPlaceholder}
        emptyMessage={livepeerOrgEcosystemFixture.emptyMessage}
      />
    </div>
  )
}
