import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { EcosystemCatalog } from "./ecosystem-catalog"

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
            <p className="font-mono text-xs uppercase text-muted-foreground">
              Ecosystem
            </p>
            <h1 className="mt-4 text-5xl leading-none font-light tracking-tight text-balance sm:text-7xl">
              Built on Livepeer
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore what developers and teams are building with real-time AI
              video inference on Livepeer.
            </p>
          </div>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={
              <Link
                href="https://livepeer.org/ecosystem/submit"
                target="_blank"
                rel="noreferrer"
              />
            }
            className="h-16 rounded-sm px-5"
          >
            Submit app
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-16 sm:mt-20">
          <EcosystemCatalog />
        </div>
      </div>
    </main>
  )
}
