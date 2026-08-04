"use client"

import { WaitlistSignupForm } from "@/components/livepeer-ui/waitlist-signup-form"

import { waitlistContentFixture } from "@/app/mockups/_data/waitlist-content"

export default function WaitlistSignupFormDemo() {
  return (
    <div className="dark w-full max-w-sm rounded-sm bg-black p-6 text-foreground">
      <WaitlistSignupForm
        {...waitlistContentFixture.signupForm}
        onJoin={() => undefined}
      />
    </div>
  )
}
