import type { Metadata } from "next"

import { PlatformSidebar } from "@/components/mockups/platform-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Platform",
    template: "%s - Livepeer Platform",
  },
}

export default function MockupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-dvh bg-background">
      <PlatformSidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}
