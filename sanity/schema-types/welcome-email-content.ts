import { MailIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  })

export const welcomeEmailContentType = defineType({
  name: "welcomeEmailContent",
  title: "Welcome email content",
  type: "document",
  icon: MailIcon,
  fields: [
    requiredString("heading", "Heading"),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      validation: (rule) => rule.required().min(1),
    }),
    requiredString("ctaLabel", "Call to action label"),
    requiredString("ctaHref", "Call to action path"),
    requiredString("signoff", "Signoff"),
    requiredString("sender", "Sender"),
  ],
  preview: {
    select: { title: "heading", subtitle: "sender" },
  },
})
