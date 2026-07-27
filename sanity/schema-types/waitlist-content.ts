import { ListPlusIcon } from "lucide-react"
import { defineField, defineType } from "sanity"

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  })

const requiredText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 3,
    validation: (rule) => rule.required(),
  })

const requiredContentObject = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[]
) =>
  defineField({
    name,
    title,
    type: "object",
    fields,
    validation: (rule) => rule.required(),
  })

export const waitlistPageContentType = defineType({
  name: "waitlistPageContent",
  title: "Waitlist page content",
  type: "document",
  icon: ListPlusIcon,
  fields: [
    requiredContentObject("metadata", "Metadata", [
      requiredString("title", "Page title"),
      requiredText("description", "Page description"),
    ]),
    requiredContentObject("backgroundHero", "Background hero", [
      requiredString("brandAriaLabel", "Brand accessible label"),
      requiredString("agentLabel", "Agent label"),
    ]),
    requiredContentObject("panel", "Waitlist panel", [
      requiredString("brandAriaLabel", "Brand accessible label"),
      requiredString("agentLabel", "Agent label"),
      requiredString("heading", "Heading"),
      requiredText("description", "Description"),
      requiredString("joinedToast", "Joined confirmation"),
      requiredString("referralPrompt", "Referral prompt"),
    ]),
    requiredContentObject("signupForm", "Signup form", [
      requiredString("label", "Field label"),
      requiredString("emailPlaceholder", "Email placeholder"),
      requiredString("submitAriaLabel", "Submit button accessible label"),
    ]),
    requiredContentObject("statusCard", "Status card", [
      requiredString("positionLabel", "Position label"),
      requiredString("referralsLabel", "Referrals label"),
    ]),
    requiredContentObject("referralLink", "Referral link", [
      requiredString("copyAriaLabel", "Copy button accessible label"),
      requiredString("copiedToast", "Copied confirmation"),
    ]),
    requiredContentObject("leaderboard", "Leaderboard", [
      requiredString("heading", "Heading"),
      requiredString("personColumnLabel", "Person column label"),
      requiredString("referralsColumnLabel", "Referrals column label"),
      requiredString("currentUserLabel", "Current user label"),
    ]),
  ],
  preview: {
    select: {
      title: "metadata.title",
      subtitle: "panel.heading",
    },
  },
})
