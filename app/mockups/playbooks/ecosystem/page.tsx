import type { Metadata } from "next"

import { EcosystemCatalog } from "./ecosystem-catalog"
import { SubmitEcosystemDialog } from "./submit-ecosystem-dialog"
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
    <main className="px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32 lg:px-10">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-5xl leading-none font-light tracking-tight text-balance sm:text-7xl">
              {content.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.description}
            </p>
          </div>
          <SubmitEcosystemDialog
            label={content.submitLabel}
            content={content.submission}
          />
        </div>

        <div className="mt-16 sm:mt-20">
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
