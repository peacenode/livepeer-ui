import {
  FileTextIcon,
  MessageSquareTextIcon,
  ShieldAlertIcon,
} from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const plannerReferenceFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 4,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "links",
    title: "Links",
    type: "array",
    of: [defineArrayMember({ type: "marketingLink" })],
  }),
]

export const plannerOutreachType = defineType({
  name: "plannerOutreach",
  title: "Outreach",
  type: "document",
  icon: MessageSquareTextIcon,
  fields: plannerReferenceFields,
  preview: { select: { title: "title", subtitle: "description" } },
})

export const plannerConstraintType = defineType({
  name: "plannerConstraint",
  title: "Constraint",
  type: "document",
  icon: ShieldAlertIcon,
  fields: plannerReferenceFields,
  preview: { select: { title: "title", subtitle: "description" } },
})

export const plannerMarkdownDocumentType = defineType({
  name: "plannerMarkdownDocument",
  title: "Planner document",
  type: "document",
  icon: FileTextIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Internal meeting", value: "internal-meeting" },
          { title: "User interview", value: "user-interview" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "occurredAt",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "markdownFile",
      title: "Markdown file",
      description: "Upload a .md file.",
      type: "file",
      options: { accept: ".md,text/markdown,text/plain" },
      validation: (rule) =>
        rule.required().custom((value) => {
          const filename = value?.asset?._ref
          return !filename || filename.toLowerCase().includes("-md-")
            ? true
            : "Upload a .md file"
        }),
    }),
  ],
  preview: {
    select: { title: "title", kind: "kind", occurredAt: "occurredAt" },
    prepare({ title, kind, occurredAt }) {
      const section =
        kind === "user-interview" ? "User interview" : "Internal meeting"
      return {
        title,
        subtitle: occurredAt ? `${section} · ${occurredAt}` : section,
      }
    },
  },
})
