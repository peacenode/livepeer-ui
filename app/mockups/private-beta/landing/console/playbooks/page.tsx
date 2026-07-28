import type { Metadata } from "next"

import { getSourcePlaybooks } from "@/app/mockups/playbooks/daydream-source"
import { SourceCatalog } from "@/app/mockups/playbooks/source-catalog"
import { PlatformPage } from "@/components/mockups/platform-page"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default async function PrivateBetaConsolePlaybooksPage() {
  const [playbooks, page] = await Promise.all([
    getSourcePlaybooks(),
    getLivepeerOrgPage("playbook-library"),
  ])
  const content = page.libraryContent
  if (!content) {
    throw new Error(
      'Required "libraryContent" is missing from "livepeerOrgPage-playbook-library".'
    )
  }

  return (
    <PlatformPage
      title={content.heading}
      description={content.description}
      variant="plain"
    >
      <SourceCatalog
        playbooks={playbooks}
        searchPlaceholder={content.searchPlaceholder}
        emptyMessage={content.emptyMessage}
      />
    </PlatformPage>
  )
}
