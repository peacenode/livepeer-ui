"use client"

import {
  type ComponentProps,
  type FormEvent,
  forwardRef,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import Image from "next/image"
import { ArrowUpIcon, CheckIcon, CopyIcon, XIcon } from "lucide-react"

import { LivepeerWordmark } from "@/components/brand"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const storageKey = "livepeer-waitlist-email"
const sessionEvent = "livepeer-waitlist-session-change"

const WaitlistEmailInput = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<typeof Input>, "size">
>(function WaitlistEmailInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      className={cn(
        "h-8 min-w-0 bg-muted px-2.5 pr-9 text-base duration-100 ease-out aria-invalid:border-transparent aria-invalid:ring-destructive md:text-xs dark:aria-invalid:border-transparent dark:aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  )
})

const WaitlistEmailSubmitField = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<typeof WaitlistEmailInput>, "size"> & {
    submitLabel: string
    canSubmit?: boolean
    submitTabIndex?: number
  }
>(function WaitlistEmailSubmitField(
  { submitLabel, canSubmit = true, submitTabIndex, className, ...props },
  ref
) {
  return (
    <div className="relative min-w-0">
      <WaitlistEmailInput ref={ref} className={className} {...props} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label={submitLabel}
        aria-disabled={!canSubmit}
        tabIndex={submitTabIndex}
        className={cn(
          "absolute top-0 right-0 rounded-sm duration-100 ease-out",
          canSubmit ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <ArrowUpIcon className="size-3.5" aria-hidden="true" />
      </Button>
    </div>
  )
})

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(sessionEvent, callback)

  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(sessionEvent, callback)
  }
}

function getSessionEmail() {
  return window.sessionStorage.getItem(storageKey) ?? ""
}

function getServerSessionEmail() {
  return ""
}

function updateSession(email?: string) {
  if (email) window.sessionStorage.setItem(storageKey, email)
  else window.sessionStorage.removeItem(storageKey)

  window.dispatchEvent(new Event(sessionEvent))
}

function referralCode(email: string) {
  let hash = 2166136261
  for (const character of email.toLowerCase()) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }

  const name = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return `${name || "invite"}-${(hash >>> 0).toString(36).slice(0, 6)}`
}

export function JoinWaitlistControl({
  defaultExpanded = false,
}: {
  defaultExpanded?: boolean
}) {
  const sessionEmail = useSyncExternalStore(
    subscribeToSession,
    getSessionEmail,
    getServerSessionEmail
  )
  const [email, setEmail] = useState("")
  const [joinError, setJoinError] = useState("")
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const helperId = useId()
  const inviteCode = useMemo(
    () => (sessionEmail ? referralCode(sessionEmail) : ""),
    [sessionEmail]
  )
  const inviteUrl = inviteCode
    ? `earlyaccess.livepeer.org/?ref=${inviteCode}`
    : ""
  const canSubmitEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const expandedWidth = defaultExpanded
    ? "w-[min(60vw,22rem)]"
    : "w-[clamp(10rem,40vw,20rem)]"

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !emailInputRef.current?.validity.valid) {
      setJoinError(
        normalizedEmail
          ? "Enter a valid email address."
          : "Enter your email address."
      )
      emailInputRef.current?.focus()
      return
    }

    updateSession(normalizedEmail)
    setEmail("")
    setJoinError("")
  }

  function expandForm() {
    setExpanded(true)
    window.setTimeout(() => emailInputRef.current?.focus(), 180)
  }

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  if (sessionEmail) {
    return (
      <div className="flex min-w-0 flex-col items-center gap-2.5">
        {defaultExpanded && (
          <span className="text-[10px] leading-none font-semibold">
            Invite a friend
          </span>
        )}
        <div
          role="textbox"
          aria-label="Your referral link"
          aria-readonly="true"
          className="relative inline-flex h-8 w-fit max-w-[min(62vw,28rem)] min-w-0 items-center rounded-sm bg-muted px-2.5 pr-9 text-xs duration-100 ease-out"
        >
          <span className="max-w-full truncate sm:hidden">
            ref={inviteCode}
          </span>
          <span className="hidden max-w-full truncate sm:inline">
            {inviteUrl}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={copyInviteUrl}
            aria-label={copied ? "Referral link copied" : "Copy referral link"}
            className="absolute top-0 right-0 rounded-sm duration-100 ease-out"
          >
            {copied ? (
              <CheckIcon className="size-3.5" aria-hidden="true" />
            ) : (
              <CopyIcon className="size-3.5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col items-center gap-2.5">
      {defaultExpanded && (
        <span className="text-[10px] leading-none font-semibold">
          Sign up for early access
        </span>
      )}
      <div
        className={`relative h-9 min-w-0 shrink transition-[width] duration-300 ease-out ${expanded ? `${expandedWidth} overflow-visible` : "w-[5.75rem] overflow-hidden"}`}
      >
        <Button
          type="button"
          variant="muted"
          size="sm"
          onClick={expandForm}
          aria-expanded={expanded}
          className={`absolute inset-y-0 left-0 h-8 w-full px-2 text-xs transition-[background-color,color,opacity,transform] duration-100 ease-out ${expanded ? "pointer-events-none translate-x-2 opacity-0" : "opacity-100"}`}
        >
          Join waitlist
        </Button>
        <form
          onSubmit={signIn}
          noValidate
          className={`absolute inset-x-0 top-0 min-w-0 p-0.5 transition-[opacity,transform] duration-200 ${expanded ? "translate-x-0 opacity-100 delay-100" : "pointer-events-none -translate-x-2 opacity-0"}`}
        >
          <WaitlistEmailSubmitField
            ref={emailInputRef}
            type="email"
            aria-label="Email address"
            aria-describedby={joinError ? helperId : undefined}
            aria-invalid={joinError ? true : undefined}
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (joinError) setJoinError("")
            }}
            required
            autoComplete="email"
            tabIndex={expanded ? 0 : -1}
            submitLabel="Join waitlist"
            canSubmit={canSubmitEmail}
            submitTabIndex={expanded ? 0 : -1}
          />
          {joinError && (
            <p
              id={helperId}
              role="alert"
              className="absolute top-full left-0 px-0.5 pt-1 text-left text-xs text-muted-foreground"
            >
              {joinError}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

function FixedWaitlistSignIn({
  theme,
  signInImage,
}: {
  theme: "base" | "inverse"
  signInImage?: { src: string; alt: string }
}) {
  const sessionEmail = useSyncExternalStore(
    subscribeToSession,
    getSessionEmail,
    getServerSessionEmail
  )
  const [signInEmail, setSignInEmail] = useState("")
  const [signInOpen, setSignInOpen] = useState(false)
  const [signInSent, setSignInSent] = useState(false)
  const canSubmitSignIn = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail.trim())

  function submitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedEmail = signInEmail.trim().toLowerCase()
    if (!normalizedEmail) return

    setSignInSent(true)
  }

  function handleSignInOpenChange(nextOpen: boolean) {
    setSignInOpen(nextOpen)
    if (!nextOpen) {
      setSignInEmail("")
      setSignInSent(false)
    }
  }

  if (sessionEmail) {
    return (
      <Button
        type="button"
        variant="link"
        size="xs"
        onClick={() => updateSession()}
        className="fixed right-4 bottom-4 z-[60] h-auto p-0 text-[10px] leading-none font-semibold text-current duration-100 ease-out sm:right-6 sm:bottom-6"
      >
        Sign out
      </Button>
    )
  }

  return (
    <Dialog open={signInOpen} onOpenChange={handleSignInOpenChange}>
      <DialogTrigger
        render={<Button type="button" variant="link" size="xs" />}
        className="fixed right-4 bottom-4 z-[60] h-auto p-0 text-[10px] leading-none font-semibold text-current duration-100 ease-out [text-shadow:0_0_2px_white,0_1px_8px_rgba(255,255,255,0.95)] sm:right-6 sm:bottom-6"
      >
        Sign in
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={`${theme === "inverse" ? "dark" : ""} h-[calc(100dvh-var(--sign-in-gutter))] min-h-0 w-[calc(100vw-var(--sign-in-gutter))] max-w-none gap-0 overflow-hidden rounded-sm p-0 [--sign-in-gutter:clamp(2rem,10vw,6rem)] sm:max-w-none`}
      >
        <div
          className="absolute top-6 left-6 z-10 text-foreground md:left-[calc(50%+clamp(2.5rem,5vw,6rem))]"
          aria-label="Livepeer"
        >
          <LivepeerWordmark className="h-4 w-auto" aria-hidden="true" />
        </div>
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              className="absolute top-4 right-4 bg-transparent hover:bg-transparent sm:top-6 sm:right-6"
            />
          }
        >
          <XIcon className="size-5" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <a
          href="https://livepeer.org"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-6 left-6 z-10 text-[10px] leading-none font-semibold text-white underline-offset-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] hover:underline md:left-[calc(50%+clamp(2.5rem,5vw,6rem))] md:text-foreground md:[text-shadow:none]"
        >
          livepeer.org
        </a>
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-2 md:grid-rows-1">
          <div className="order-1 flex min-h-0 items-end px-6 pt-16 pb-8 sm:px-10 md:order-2 md:items-center md:px-[clamp(2.5rem,5vw,6rem)] md:py-16">
            <div className="w-full max-w-lg text-left">
              <DialogHeader className="sr-only">
                <DialogTitle>
                  {signInSent
                    ? "Check your email"
                    : "Sign in to Livepeer Agent"}
                </DialogTitle>
                <DialogDescription>
                  {signInSent
                    ? "Your sign-in email will come from agentinfo@livepeer.org."
                    : "Enter the email you used to join the waitlist."}
                </DialogDescription>
              </DialogHeader>
              {signInSent ? (
                <div role="status" aria-live="polite">
                  <h2 className="font-display text-display-sm text-balance sm:text-display-lg">
                    Check your email
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                    You&apos;ll receive a sign-in link from{" "}
                    <span className="font-medium text-foreground">
                      agentinfo@livepeer.org
                    </span>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-display-sm text-balance sm:text-display-lg">
                    Sign in to Livepeer Agent
                  </h2>
                  <form onSubmit={submitSignIn} className="mt-8">
                    <WaitlistEmailSubmitField
                      id="scroller-waitlist-sign-in"
                      aria-label="Email address"
                      type="email"
                      value={signInEmail}
                      onChange={(event) => setSignInEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      submitLabel="Sign in"
                      canSubmit={canSubmitSignIn}
                    />
                  </form>
                </>
              )}
            </div>
          </div>
          {signInImage && (
            <div className="relative order-2 min-h-0 overflow-hidden bg-muted md:order-1">
              <Image
                src={signInImage.src}
                alt={signInImage.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-b md:from-black/25 md:to-transparent" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function WaitlistHeaderAuth({
  theme = "base",
  signInImage,
}: {
  theme?: "base" | "inverse"
  signInImage?: { src: string; alt: string }
}) {
  const sessionEmail = useSyncExternalStore(
    subscribeToSession,
    getSessionEmail,
    getServerSessionEmail
  )

  return (
    <>
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 shrink-0 items-center text-[10px] leading-none font-semibold sm:hidden">
          Livepeer Agent Early Access
        </span>
        <span className="hidden h-8 shrink-0 items-center text-[10px] leading-none font-semibold sm:flex">
          {sessionEmail ? "Invite a friend" : "Livepeer Agent Early Access"}
        </span>
        <div className="hidden sm:block">
          <JoinWaitlistControl />
        </div>
      </div>
      <FixedWaitlistSignIn theme={theme} signInImage={signInImage} />
    </>
  )
}
