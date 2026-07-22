import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { InstallCommand } from "@/components/docs/install-command"
import { registryItemUrl, siteConfig } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Introduction",
  description: siteConfig.description,
}

const registriesConfig = `{
  "registries": {
    "@livepeer-ui": "${siteConfig.baseUrl}/r/{name}.json"
  }
}`

export default function DocsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Introduction</h1>
      <p className="mt-2 text-muted-foreground text-balance">
        livepeer/ui is a shadcn component registry. Every component is built on
        the vega style with the neutral palette, zero radius, and Inter — the
        preset this registry ships as its theme.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Install any component directly from this registry with the shadcn CLI.
        For example, to add the button:
      </p>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl("button")} />
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Registry namespace
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        To install components with the shorter{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          @livepeer-ui/button
        </code>{" "}
        syntax, add the registry to your{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          components.json
        </code>
        :
      </p>
      <div className="mt-4">
        <CodeBlock code={registriesConfig} lang="json" />
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Theme</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The registry is generated from the shadcn preset{" "}
        <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[13px]">
          bIkeynI
        </code>{" "}
        — vega style, neutral base color, lucide icons, Inter, radius none,
        subtle menu accent. The theme is available as a registry item and can be
        applied to an existing project:
      </p>
      <div className="mt-4">
        <InstallCommand url={registryItemUrl("theme")} />
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Components</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Each component page includes a live preview, the install command, and
        the full source of the example.{" "}
        <Link
          href="/docs/components/accordion"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Browse the components
        </Link>
        .
      </p>
    </article>
  )
}
