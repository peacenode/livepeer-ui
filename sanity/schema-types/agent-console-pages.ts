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

const pageSlugs = [
  "home",
  "usage",
  "api-keys",
  "api-logs",
  "billing",
  "compute",
  "account",
  "project-settings",
  "organization",
  "inference",
] as const

const pageObject = (
  name: string,
  title: string,
  slug: (typeof pageSlugs)[number],
  fields: ReturnType<typeof defineField>[]
) =>
  defineField({
    name,
    title,
    type: "object",
    hidden: ({ parent }) => parent?.slug !== slug,
    validation: (rule) =>
      rule.custom((value, context) =>
        (context.parent as { slug?: string })?.slug === slug && !value
          ? `${title} is required`
          : true
      ),
    fields,
  })

export const agentConsoleShellType = defineType({
  name: "agentConsoleShell",
  title: "Agent Console shell",
  type: "document",
  fields: [
    requiredString("homeAriaLabel", "Home link accessible label"),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredString("label", "Label"),
            requiredString("href", "Path"),
            defineField({
              name: "external",
              title: "Opens in a new section",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "userMenu",
      title: "User menu copy",
      type: "object",
      fields: [
        requiredString("accountLabel", "Account label"),
        requiredString("manageProfileLabel", "Manage profile"),
        requiredString("developerDocsLabel", "Developer docs"),
        requiredString("termsLabel", "Terms and policies"),
        requiredString("helpLabel", "Help"),
        requiredString("logoutLabel", "Log out"),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "auth",
      title: "Authentication copy",
      type: "object",
      fields: [
        requiredString("dialogLabel", "Dialog accessible label"),
        requiredString("title", "Title"),
        requiredText("description", "Description"),
        requiredString("googleLabel", "Google button"),
        requiredString("discordLabel", "Discord button"),
        requiredString("emailDividerLabel", "Email divider"),
        requiredString("emailInputLabel", "Email input accessible label"),
        requiredString("emailPlaceholder", "Email input placeholder"),
        requiredString("continueLabel", "Continue button"),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Agent Console shell" }) },
})

export const agentConsolePageType = defineType({
  name: "agentConsolePage",
  title: "Agent Console page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: pageSlugs.map((slug) => ({ title: slug, value: slug })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    requiredString("heading", "Heading"),
    requiredText("description", "Description"),
    pageObject("home", "Home content", "home", [
      requiredString("onboardingTitle", "Onboarding heading"),
      defineField({
        name: "onboardingSteps",
        title: "Onboarding steps",
        type: "array",
        validation: (rule) => rule.required().min(1),
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              requiredString("label", "Label"),
              requiredString("href", "Path"),
            ],
          }),
        ],
      }),
      defineField({
        name: "featureLinks",
        title: "Feature links",
        type: "array",
        validation: (rule) => rule.required().min(1),
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              requiredString("title", "Title"),
              requiredText("description", "Description"),
              requiredString("href", "URL or path"),
              requiredString("imageSrc", "Image path"),
            ],
          }),
        ],
      }),
      requiredString("researchTitle", "Research heading"),
      requiredString("researchHref", "Research URL"),
      requiredString("researchEmptyLabel", "Research empty state label"),
    ]),
    pageObject("usage", "Usage content", "usage", [
      requiredString("overviewTabLabel", "Overview tab"),
      requiredString("activityTabLabel", "Activity tab"),
      requiredString("upgradeTitle", "Upgrade heading"),
      requiredText("upgradeDescription", "Upgrade description"),
      requiredString("dailyUsageTitle", "Daily usage heading"),
      requiredString("dailyUsageEmptyMessage", "Daily usage empty state"),
      requiredString("resourceUsageTitle", "Resource usage heading"),
      requiredString("resourceUsageEmptyMessage", "Resource usage empty state"),
    ]),
    pageObject("apiKeys", "API keys content", "api-keys", [
      requiredString("newKeyLabel", "New key button"),
      requiredString("dialogTitle", "Dialog heading"),
      requiredText("dialogDescription", "Dialog description"),
      requiredString("keyNameLabel", "Key name label"),
      requiredString("keyNamePlaceholder", "Key name placeholder"),
      requiredString("cancelLabel", "Cancel button"),
      requiredString("generateLabel", "Generate button"),
      requiredString("filterPlaceholder", "Filter placeholder"),
      requiredString("emptyMessage", "Empty state"),
      requiredString("paginationLabel", "Pagination label"),
    ]),
    pageObject("apiLogs", "API logs content", "api-logs", [
      requiredString("refreshLabel", "Refresh button"),
      requiredString("clearLabel", "Clear button"),
      requiredString("searchPlaceholder", "Search placeholder"),
      requiredString("errorsOnlyLabel", "Errors only label"),
      requiredString("emptyMessage", "Empty state"),
    ]),
    pageObject("billing", "Billing content", "billing", [
      defineField({
        name: "ctas",
        title: "Calls to action",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              requiredString("label", "Label"),
              requiredString("href", "URL or path"),
            ],
          }),
        ],
      }),
      requiredString("managePaymentLabel", "Manage payment button"),
    ]),
    pageObject("compute", "Compute content", "compute", [
      requiredString("actionLabel", "Primary action"),
      requiredString("actionHref", "Primary action URL"),
      requiredString("servicePayoutsLabel", "Service payouts label"),
      requiredString("protocolRewardsLabel", "Protocol rewards label"),
      requiredString("periodLabel", "Metric period"),
      requiredText("dataNote", "Data source note"),
    ]),
    pageObject("account", "Account content", "account", [
      requiredString("profileDetailsTitle", "Profile details heading"),
      requiredText("profileDetailsDescription", "Profile details description"),
      requiredString("uploadLabel", "Upload button"),
      requiredText("uploadHelp", "Upload help"),
      requiredString("usernameLabel", "Username label"),
      requiredText("usernameHelp", "Username help"),
      requiredString("displayNameLabel", "Display name label"),
      requiredString("roleLabel", "Role label"),
      requiredString("rolePlaceholder", "Role placeholder"),
      requiredString("locationLabel", "Location label"),
      requiredString("locationPlaceholder", "Location placeholder"),
      requiredString("bioLabel", "Bio label"),
      requiredString("bioPlaceholder", "Bio placeholder"),
      requiredString("resetLabel", "Reset button"),
      requiredString("saveLabel", "Save button"),
    ]),
    pageObject(
      "projectSettings",
      "Project settings content",
      "project-settings",
      [
        requiredString("generalTabLabel", "General tab"),
        requiredString("membersTabLabel", "Members tab"),
        requiredString("projectNameLabel", "Project name label"),
        requiredString("projectIdLabel", "Project ID label"),
        requiredText("projectIdHelp", "Project ID help"),
        requiredString("regionLabel", "Region label"),
        requiredText("regionHelp", "Region help"),
        requiredString("allowKeysLabel", "Allow keys label"),
        requiredString("saveLabel", "Save button"),
        requiredText("membersDescription", "Members description"),
        requiredString("addMemberLabel", "Add member button"),
        requiredString("memberColumnLabel", "Member column"),
        requiredString("accessColumnLabel", "Access column"),
        requiredString("sourceColumnLabel", "Source column"),
      ]
    ),
    pageObject("organization", "Organization content", "organization", [
      requiredString("generalTabLabel", "General tab"),
      requiredString("membersTabLabel", "Members tab"),
      requiredString("billingTabLabel", "Billing tab"),
      requiredString("organizationNameLabel", "Organization name label"),
      requiredString("organizationIdLabel", "Organization ID label"),
      requiredString("saveLabel", "Save button"),
      requiredText("membersDescription", "Members description"),
      requiredString("inviteMemberLabel", "Invite member button"),
      requiredString("currentPeriodLabel", "Current period label"),
      requiredString("creditBalanceLabel", "Credit balance label"),
      requiredString("addCreditsLabel", "Add credits button"),
      requiredText("creditBalanceDescription", "Credit balance description"),
      requiredString("paymentMethodsTitle", "Payment methods heading"),
      requiredString("addPaymentMethodLabel", "Add payment method button"),
      requiredString("invoicesTitle", "Invoices heading"),
      requiredString("downloadLabel", "Download button"),
      requiredString("memberColumnLabel", "Member column"),
      requiredString("emailColumnLabel", "Email column"),
      requiredString("roleColumnLabel", "Role column"),
      requiredString("methodColumnLabel", "Method column"),
      requiredString("expiresColumnLabel", "Expires column"),
      requiredString("invoiceColumnLabel", "Invoice column"),
      requiredString("periodColumnLabel", "Period column"),
      requiredString("amountColumnLabel", "Amount column"),
      requiredString("statusColumnLabel", "Status column"),
    ]),
    pageObject("inference", "Inference container content", "inference", [
      requiredString("breadcrumbLabel", "Back link label"),
      requiredString("deployLabel", "Deploy button"),
      requiredString("pullsLabel", "Pulls metric"),
      requiredString("starsLabel", "Stars metric"),
      requiredString("lastPushLabel", "Last push metric"),
      requiredString("imagesTitle", "Images heading"),
      requiredString("tagColumnLabel", "Tag column"),
      requiredString("sizeColumnLabel", "Size column"),
      requiredString("pushedColumnLabel", "Pushed column"),
      requiredString("endpointsTitle", "Endpoints heading"),
      requiredString("runLocallyTitle", "Run locally heading"),
      requiredText("runLocallyDescription", "Run locally description"),
      requiredText("dataNote", "Live data note"),
    ]),
  ],
  preview: { select: { title: "heading", subtitle: "slug" } },
})
