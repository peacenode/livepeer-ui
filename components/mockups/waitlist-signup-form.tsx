"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistSignupForm({
  onJoin,
}: {
  onJoin: (email: string) => void
}) {
  const [email, setEmail] = useState("")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onJoin(email)
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="waitlist-email" className="text-sm font-medium">
        Get early access
      </label>
      <div className="mt-3 flex h-16 gap-1.5 rounded-sm border border-white/25 bg-transparent p-1.5 text-white transition-shadow focus-within:border-white/45 focus-within:ring-2 focus-within:ring-white/20">
        <Input
          id="waitlist-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-base text-white shadow-none placeholder:text-white/45 focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon-lg"
          aria-label="Join the waitlist"
          className="h-full w-14 rounded-[3px] border border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-500"
          style={{
            backgroundImage:
              "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
          }}
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
