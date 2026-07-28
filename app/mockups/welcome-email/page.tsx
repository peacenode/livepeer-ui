import type { Metadata } from "next"

import { WelcomeEmail } from "@/components/mockups/welcome-email"
import { getWelcomeEmailContent } from "@/sanity/lib/welcome-email-content"

export const metadata: Metadata = {
  title: "Welcome Email",
  description: "Private beta welcome email for Livepeer Agent.",
}

export default async function WelcomeEmailPage() {
  const content = await getWelcomeEmailContent()

  return (
    <main className="flex min-h-svh justify-center bg-muted sm:px-6">
      <WelcomeEmail content={content} />
    </main>
  )
}
