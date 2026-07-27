import type { Metadata } from "next"

import { getSourcePlaybooks } from "../daydream-source"
import { InstallAgentFooter } from "../install-agent-footer"
import { SourceCatalog } from "../source-catalog"
import { PlaybookLibraryHeader } from "@/components/mockups/playbook-library-header"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default async function PlaybooksLibraryPage() {
  const page = await getLivepeerOrgPage("playbook-library")
  if (!page.libraryContent)
    throw new Error(
      'Required "libraryContent" is missing from "livepeerOrgPage-playbook-library".'
    )
  const playbooks = await getSourcePlaybooks()

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-20">
        <PlaybookLibraryHeader
          heading={page.libraryContent.heading}
          description={page.libraryContent.description}
        />
        <div className="mt-4">
          <SourceCatalog playbooks={playbooks} />
        </div>
      </div>
      <InstallAgentFooter title={page.libraryContent.footerHeading} />
    </main>
  )
}
