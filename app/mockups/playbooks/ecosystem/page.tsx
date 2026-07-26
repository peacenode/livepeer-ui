import type { Metadata } from "next"

import { EcosystemCatalog } from "./ecosystem-catalog"
import { SubmitEcosystemDialog } from "./submit-ecosystem-dialog"

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Explore applications and developer tools built on the Livepeer network.",
}

export default function EcosystemPage() {
  return (
    <main className="px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32 lg:px-10">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-5xl leading-none font-light tracking-tight text-balance sm:text-7xl">
              Built on Livepeer
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore what developers and teams are building with real-time AI
              video inference on Livepeer.
            </p>
          </div>
          <SubmitEcosystemDialog />
        </div>

        <div className="mt-16 sm:mt-20">
          <EcosystemCatalog />
        </div>
      </div>
    </main>
  )
}
