"use client"

import { WaitlistSignupForm } from "@/components/mockups/waitlist-signup-form"

export default function WaitlistSignupFormDemo() {
  return (
    <div className="dark w-full max-w-sm rounded-xl bg-black p-6 text-foreground">
      <WaitlistSignupForm onJoin={() => undefined} />
    </div>
  )
}
