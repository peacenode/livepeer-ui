import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { SiteHeader } from "@/components/docs/site-header"
import { RegistryHomeActions } from "@/components/registry-home-actions"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center">
        <section className="flex w-full flex-col items-center px-5 py-16 text-center sm:px-8">
          <h1
            className="flex items-center justify-center gap-3 text-foreground"
            aria-label="Livepeer"
          >
            <LivepeerGradientSymbol
              className="h-12 w-auto sm:h-14"
              aria-hidden="true"
            />
            <LivepeerWordmark
              className="h-8 w-auto sm:h-9"
              aria-hidden="true"
            />
          </h1>
          <div className="mt-10 w-full">
            <div className="mx-auto flex justify-center">
              <RegistryHomeActions />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
