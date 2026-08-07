"use client"

import { type FormEvent, useState } from "react"

import { WaitlistEmailField } from "@/components/livepeer-ui/waitlist-email-field"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function WaitlistSignInDialog() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setEmail("")
      setSent(false)
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger className="text-xs font-medium text-white/65 hover:text-white">
        Sign in
      </DialogTrigger>
      <DialogContent className="dark gap-8 rounded-sm border border-white/15 bg-[#0d0d0d] p-6 text-white opacity-100 shadow-2xl sm:p-8 data-open:scale-100 data-open:animate-none">
        {sent ? (
          <div className="py-8 text-center" role="status" aria-live="polite">
            <DialogTitle className="font-display text-3xl leading-none font-light tracking-[-0.04em]">
              Check your email
            </DialogTitle>
            <DialogDescription className="mt-4 text-white/55">
              If {email} is on the list, a sign-in link is on its way.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl leading-none font-light tracking-[-0.04em]">
                Sign in
              </DialogTitle>
              <DialogDescription className="mt-2 text-white/55">
                Enter the email you used to join. We&apos;ll send you a sign-in
                link.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit}>
              <Label
                htmlFor="waitlist-sign-in-email"
                className="text-xs font-medium text-white"
              >
                Email address
              </Label>
              <WaitlistEmailField
                id="waitlist-sign-in-email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                submitAriaLabel="Email me a sign-in link"
              />
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
