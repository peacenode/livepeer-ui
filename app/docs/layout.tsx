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
      <div className="flex w-full flex-1 px-4 md:px-8">
        <DocsSidebar />
        <main className="w-full min-w-0 flex-1 py-8 md:pl-10">
          <div className="mx-auto w-full [&>*]:mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
