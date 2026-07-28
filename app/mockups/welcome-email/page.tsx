import type { Metadata } from "next"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Welcome Email",
  description: "Private beta welcome email for Livepeer Agent.",
}

export default function WelcomeEmailPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-6 py-16 text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-light tracking-[-0.045em] text-balance">
          <span className="block">Welcome to the</span>
          <span className="block">private beta</span>
        </h1>
        <Button
          size="sm"
          className="mt-10 h-11 rounded-sm px-5 text-sm sm:mt-12"
        >
          Add to Claude
        </Button>
      </div>
    </main>
  )
}
