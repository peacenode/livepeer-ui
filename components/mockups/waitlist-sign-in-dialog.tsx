"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
      <DialogContent className="dark gap-8 rounded-sm border border-white/15 bg-[#0d0d0d] p-6 text-white opacity-100 shadow-2xl data-open:animate-none data-open:scale-100 sm:p-8">
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
              <div className="mt-3 flex h-16 gap-1 rounded-sm border border-white/25 bg-transparent p-1 text-white transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-white/30">
                <Input
                  id="waitlist-sign-in-email"
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
                  aria-label="Email me a sign-in link"
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
