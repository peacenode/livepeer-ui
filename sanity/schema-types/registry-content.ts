import {
  CreditCardIcon,
  ExternalLinkIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const relativeOrHttpUrl = (value: string | undefined) => {
  if (!value) return true
  if (value.startsWith("/") && !value.startsWith("//")) return true

  try {
    const url = new URL(value)
    return ["http:", "https:"].includes(url.protocol)
      ? true
      : "Use a site-relative path or an HTTP(S) URL"
  } catch {
    return "Use a site-relative path or an HTTP(S) URL"
  }
}

export const registryCtaType = defineType({
  name: "registryCta",
  title: "Call to action",
  type: "object",
  icon: ExternalLinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
      validation: (rule) => rule.required().custom(relativeOrHttpUrl),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
})

export const mockupRoundupType = defineType({
  name: "mockupRoundup",
  title: "Mockup roundup",
  type: "document",
  icon: GalleryVerticalEndIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
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
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewHref",
      title: "Mockup URL or path",
      type: "string",
      validation: (rule) => rule.required().custom(relativeOrHttpUrl),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
})

export const agentConsoleEditorialPageType = defineType({
  name: "agentConsoleEditorialPage",
  title: "Agent Console editorial page",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Usage", value: "usage" },
          { title: "Billing", value: "billing" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "usageContent",
      title: "Usage workspace copy",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "usage",
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as { page?: string })?.page === "usage" && !value
            ? "Usage workspace copy is required"
            : true
        ),
      fields: [
        ["overviewTabLabel", "Overview tab label"],
        ["activityTabLabel", "Activity tab label"],
        ["upgradeTitle", "Upgrade heading"],
        ["upgradeDescription", "Upgrade description"],
        ["dailyUsageTitle", "Daily usage heading"],
        ["dailyUsageEmptyMessage", "Daily usage empty message"],
        ["resourceUsageTitle", "Resource usage heading"],
        ["resourceUsageEmptyMessage", "Resource usage empty message"],
      ].map(([name, title]) =>
        defineField({
          name,
          title,
          type: name.endsWith("Description") ? "text" : "string",
          validation: (rule) => rule.required(),
        })
      ),
    }),
    defineField({
      name: "ctas",
      title: "Calls to action",
      type: "array",
      of: [defineArrayMember({ type: "registryCta" })],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "page",
    },
  },
})
