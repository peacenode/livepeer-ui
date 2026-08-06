"use client"

import { type FormEvent, useState } from "react"

import { WaitlistEmailField } from "@/components/livepeer-ui/waitlist-email-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function WaitlistSignupForm({
  label,
  emailPlaceholder,
  submitAriaLabel,
  onJoin,
}: {
  label: string
  emailPlaceholder: string
  submitAriaLabel: string
  onJoin: (email: string) => void
}) {
  const [email, setEmail] = useState("")
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onJoin(email)
  }

  return (
    <form onSubmit={submit}>
      <Label
        htmlFor="waitlist-email"
        className="text-xs font-medium text-white"
      >
        {label}
      </Label>
      <WaitlistEmailField
        id="waitlist-email"
        placeholder={emailPlaceholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        submitAriaLabel={submitAriaLabel}
      />
      <div className="mt-4 flex items-start gap-3">
        <Checkbox
          id="newsletter-opt-in"
          checked={newsletterOptIn}
          onCheckedChange={(checked) => setNewsletterOptIn(checked === true)}
        />
        <Label
          htmlFor="newsletter-opt-in"
          className="cursor-pointer text-xs leading-5 font-normal text-white/65"
        >
          Send me Livepeer news, product updates, and announcements.
        </Label>
      </div>
    </form>
  )
}
