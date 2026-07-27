import { SiteHeader } from "@/components/docs/site-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4 md:px-8">
        <DocsSidebar />
        <main className="w-full min-w-0 flex-1 py-8 md:pl-10">{children}</main>
      </div>
    </div>
  )
}
