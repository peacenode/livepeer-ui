import { LivepeerGradientLockup } from "@/components/brand"
import { SiteHeader } from "@/components/docs/site-header"
import { RegistryHomeActions } from "@/components/registry-home-actions"
import { components } from "@/lib/docs"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center">
        <section className="flex w-full flex-col items-center px-5 py-16 text-center sm:px-8">
          <h1 className="text-foreground">
            <LivepeerGradientLockup className="h-9 w-auto sm:h-11" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-balance text-muted-foreground sm:text-lg">
            A shadcn component registry built on the luma style. Neutral
            palette, Favorit. {components.length} components, installable with
            the shadcn CLI.
          </p>
          <div className="mt-8 w-full">
            <div className="mx-auto flex justify-center">
              <RegistryHomeActions />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
