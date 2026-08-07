import { HelpCircleIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

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

export const faqPageContentType = defineType({
  name: "faqPageContent",
  title: "FAQ page content",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    requiredString("title", "Page title"),
    requiredText("subtitle", "Page subtitle"),
    defineField({
      name: "items",
      title: "Questions",
      description: "Drag to set the display order.",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "Question",
          type: "object",
          fields: [
            requiredString("question", "Question"),
            requiredText("answer", "Answer"),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
})
