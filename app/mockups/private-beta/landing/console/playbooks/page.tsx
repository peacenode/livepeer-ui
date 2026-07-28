import type { Metadata } from "next"

import { getSourcePlaybooks } from "@/app/mockups/playbooks/daydream-source"
import { SourceCatalog } from "@/app/mockups/playbooks/source-catalog"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default async function PrivateBetaConsolePlaybooksPage() {
  const playbooks = await getSourcePlaybooks()

  return (
    <PlatformPage
      title="Playbooks"
      description="Choose a production recipe to run with Livepeer Agent."
      variant="plain"
    >
      <SourceCatalog playbooks={playbooks} />
    </PlatformPage>
  )
}
