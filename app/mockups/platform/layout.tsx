import type { Metadata } from "next"

import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"
import { PlatformSidebar } from "@/components/mockups/platform-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s - Livepeer Console",
  },
}

export default function MockupsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PlatformAuthGate>
      <div className="relative flex h-dvh overflow-hidden bg-background">
        <PlatformSidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="mx-auto flex min-h-0 w-full max-w-screen-2xl flex-1 flex-col px-4 pt-6 sm:px-6 md:px-10 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </PlatformAuthGate>
  )
}
