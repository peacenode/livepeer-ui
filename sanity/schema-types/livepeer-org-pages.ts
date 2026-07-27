import { Globe2Icon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const linkFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "href",
    title: "URL or path",
    type: "string",
    validation: (r) => r.required(),
  }),
]

export const livepeerOrgLinkType = defineType({
  name: "livepeerOrgLink",
  title: "Link",
  type: "object",
  fields: linkFields,
  preview: { select: { title: "label", subtitle: "href" } },
})

export const livepeerOrgSiteType = defineType({
  name: "livepeerOrgSite",
  title: "Livepeer.org site shell",
  type: "document",
  icon: Globe2Icon,
  fields: [
    defineField({
      name: "homeHref",
      title: "Logo destination",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "menuLinks",
      title: "Menu links",
      type: "array",
      of: [defineArrayMember({ type: "livepeerOrgLink" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footerGroups",
      title: "Footer link groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "livepeerOrgFooterGroup",
          title: "Footer group",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [defineArrayMember({ type: "livepeerOrgLink" })],
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "livepeerOrgSocialLink",
          title: "Social link",
          fields: [
            ...linkFields,
            defineField({
              name: "service",
              title: "Service",
              type: "string",
              options: { list: ["discord", "x", "github", "website"] },
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "service" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Livepeer.org site shell" }) },
})

const cta = defineField({
  name: "cta",
  title: "Call to action",
  type: "livepeerOrgLink",
  validation: (r) => r.required(),
})
const heading = defineField({
  name: "heading",
  title: "Heading",
  type: "string",
  validation: (r) => r.required(),
})
const description = defineField({
  name: "description",
  title: "Description",
  type: "text",
  rows: 3,
  validation: (r) => r.required(),
})

export const livepeerOrgPageType = defineType({
  name: "livepeerOrgPage",
  title: "Livepeer.org page",
  type: "document",
  icon: Globe2Icon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Home", value: "home" },
          { title: "Livepeer Agent", value: "livepeer-agent" },
          { title: "Playbook library", value: "playbook-library" },
          { title: "Ecosystem", value: "ecosystem" },
          { title: "Provide GPU compute", value: "provide-gpu-compute" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "homeContent",
      title: "Landing sections",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "home",
      fields: [
        defineField({
          name: "hero",
          title: "Network hero",
          type: "object",
          fields: [
            heading,
            defineField({
              name: "accent",
              title: "Muted continuation",
              type: "text",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "primaryCta",
              title: "Primary action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "secondaryCta",
              title: "Secondary action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: "agentFeature",
          title: "Agent feature",
          type: "object",
          fields: [
            description,
            defineField({
              name: "installCta",
              title: "Install action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "libraryCta",
              title: "Library action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: "providerCta",
          title: "GPU provider section",
          type: "object",
          fields: [heading, description, cta],
        }),
      ],
    }),
    defineField({
      name: "agentContent",
      title: "Agent installation sections",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "livepeer-agent",
      fields: [
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            heading,
            description,
            defineField({
              name: "serverUrl",
              title: "MCP server URL",
              type: "url",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "signInCta",
              title: "Sign-in action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "createAccountCta",
              title: "Create-account action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: "access",
          title: "API access",
          type: "object",
          fields: [heading, description, cta],
        }),
        defineField({
          name: "capabilities",
          title: "Capabilities section",
          type: "object",
          fields: [
            heading,
            defineField({
              name: "cta",
              title: "Action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: "playbooks",
          title: "Playbooks section",
          type: "object",
          fields: [heading, description, cta],
        }),
      ],
    }),
    defineField({
      name: "libraryContent",
      title: "Library UI",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "playbook-library",
      fields: [
        heading,
        description,
        defineField({
          name: "searchPlaceholder",
          title: "Search placeholder",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "allCategoryLabel",
          title: "All category label",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "emptyMessage",
          title: "Empty result message",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "footerHeading",
          title: "Install footer heading",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "ecosystemContent",
      title: "Ecosystem directory",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "ecosystem",
      fields: [
        heading,
        description,
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "searchPlaceholder",
          title: "Search placeholder",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "emptyMessage",
          title: "Empty result message",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "apps",
          title: "Curated apps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "livepeerOrgEcosystemApp",
              title: "App",
              fields: [
                defineField({
                  name: "name",
                  title: "Name",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "domain",
                  title: "Domain",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                  validation: (r) => r.required(),
                }),
                description,
                defineField({
                  name: "image",
                  title: "Logo path",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "tags",
                  title: "Categories",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (r) => r.required().min(1).unique(),
                }),
              ],
              preview: { select: { title: "name", subtitle: "domain" } },
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: "submission",
          title: "Submission dialog",
          type: "object",
          fields: [
            heading,
            description,
            defineField({
              name: "steps",
              title: "Steps",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "livepeerOrgSubmissionStep",
                  fields: [heading, description],
                }),
              ],
              validation: (r) => r.required().min(1),
            }),
            defineField({
              name: "templatePath",
              title: "Template path",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "template",
              title: "Template contents",
              type: "text",
              rows: 8,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "closeLabel",
              title: "Close label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "githubCta",
              title: "GitHub action",
              type: "livepeerOrgLink",
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "earnContent",
      title: "GPU provider editorial sections",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "provide-gpu-compute",
      fields: [
        defineField({
          name: "earnings",
          title: "Network earnings labels",
          type: "object",
          fields: [
            defineField({
              name: "servicePayoutsLabel",
              title: "Service payouts label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "protocolRewardsLabel",
              title: "Protocol rewards label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "periodLabel",
              title: "Period label",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          validation: (r) => r.required(),
        }),
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [heading, description, cta],
        }),
        defineField({
          name: "pathsHeading",
          title: "Paths heading",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "pathsDescription",
          title: "Paths description",
          type: "text",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "paths",
          title: "Provider paths",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "livepeerOrgProviderPath",
              fields: [
                heading,
                defineField({
                  name: "fit",
                  title: "Best fit",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                description,
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ["cable", "sparkles", "server-cog"] },
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "requirements",
                  title: "Requirements",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (r) => r.required().min(1),
                }),
                defineField({
                  name: "note",
                  title: "Note",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                cta,
              ],
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: "baselineHeading",
          title: "Baseline heading",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "baselineDescription",
          title: "Baseline description",
          type: "text",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "baseline",
          title: "Baseline requirements",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "livepeerOrgBaselineItem",
              fields: [
                heading,
                description,
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: { list: ["cpu", "server", "network", "dollar"] },
                  validation: (r) => r.required(),
                }),
              ],
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: "arbitrum",
          title: "Arbitrum panel",
          type: "object",
          fields: [
            heading,
            description,
            defineField({
              name: "imageAlt",
              title: "Logo alternative text",
              type: "string",
              validation: (r) => r.required(),
            }),
            cta,
            defineField({
              name: "disclaimer",
              title: "Disclaimer",
              type: "text",
              validation: (r) => r.required(),
            }),
          ],
        }),
        defineField({
          name: "stake",
          title: "LPT panel",
          type: "object",
          fields: [heading, description, cta],
        }),
      ],
    }),
  ],
  preview: { select: { title: "seoTitle", subtitle: "page" } },
})
