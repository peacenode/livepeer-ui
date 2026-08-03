import type { Metadata } from "next"

import { EcosystemCatalog } from "./ecosystem-catalog"
import { DisplayHeading } from "@/components/ui/display-heading"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Explore applications and developer tools built on the Livepeer network.",
}

export default async function EcosystemPage() {
  const page = await getLivepeerOrgPage("ecosystem")
  if (!page.ecosystemContent)
    throw new Error(
      'Required "ecosystemContent" is missing from "livepeerOrgPage-ecosystem".'
    )
  const content = page.ecosystemContent
  return (
    <main className="px-4 pt-16 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <header className="pt-12 text-center lg:pt-16">
          <DisplayHeading>{content.heading}</DisplayHeading>
        </header>

        <div className="mt-8">
          <EcosystemCatalog
            apps={content.apps}
            searchPlaceholder={content.searchPlaceholder}
            emptyMessage={content.emptyMessage}
          />
        </div>
      </div>
    </main>
  )
}
