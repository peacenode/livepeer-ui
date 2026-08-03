import { WelcomeEmail } from "@/components/livepeer-ui/welcome-email"

const content = {
  heading: "Welcome to the private beta.",
  paragraphs: [
    "You're in.",
    "Livepeer Agent brings image and video generation directly into Claude, so you can create without leaving your session.",
    "Your account includes limited free credits to help you run your first generation.",
  ],
  ctaLabel: "Add to Claude",
  ctaHref: "/mockups/agent-landing-page",
  signoff: "See you in Claude,",
  sender: "The Livepeer team",
}

export default function WelcomeEmailDemo() {
  return (
    <div className="flex w-full justify-center overflow-hidden rounded-2xl bg-muted p-3">
      <WelcomeEmail content={content} />
    </div>
  )
}
