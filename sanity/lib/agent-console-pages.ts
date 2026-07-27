import { defineQuery } from "next-sanity"

import type {
  AgentConsoleLink,
  AgentConsoleShell,
} from "@/components/mockups/contracts"
import { sanityClient } from "@/sanity/lib/client"

export type {
  AgentConsoleLink,
  AgentConsoleShell,
  AgentConsoleUser,
} from "@/components/mockups/contracts"

export type AgentConsolePageSlug =
  | "home"
  | "usage"
  | "api-keys"
  | "api-logs"
  | "billing"
  | "compute"
  | "account"
  | "project-settings"
  | "organization"
  | "inference"

export type AgentConsolePage<T extends object = Record<string, never>> = {
  _id: string
  slug: AgentConsolePageSlug
  heading: string
  description: string
} & T

export type HomePageContent = AgentConsolePage<{
  home: {
    onboardingTitle: string
    onboardingSteps: AgentConsoleLink[]
    featureLinks: {
      _key?: string
      title: string
      description: string
      href: string
      imageSrc: string
    }[]
    researchTitle: string
    researchHref: string
    researchEmptyLabel: string
  }
}>
export type UsagePageContent = AgentConsolePage<{
  usage: {
    overviewTabLabel: string
    activityTabLabel: string
    upgradeTitle: string
    upgradeDescription: string
    dailyUsageTitle: string
    dailyUsageEmptyMessage: string
    resourceUsageTitle: string
    resourceUsageEmptyMessage: string
  }
}>
export type ApiKeysPageContent = AgentConsolePage<{
  apiKeys: {
    newKeyLabel: string
    dialogTitle: string
    dialogDescription: string
    keyNameLabel: string
    keyNamePlaceholder: string
    cancelLabel: string
    generateLabel: string
    filterPlaceholder: string
    emptyMessage: string
    paginationLabel: string
  }
}>
export type ApiLogsPageContent = AgentConsolePage<{
  apiLogs: {
    refreshLabel: string
    clearLabel: string
    searchPlaceholder: string
    errorsOnlyLabel: string
    emptyMessage: string
  }
}>
export type BillingPageContent = AgentConsolePage<{
  billing: { ctas: AgentConsoleLink[]; managePaymentLabel: string }
}>
export type ComputePageContent = AgentConsolePage<{
  compute: {
    actionLabel: string
    actionHref: string
    servicePayoutsLabel: string
    protocolRewardsLabel: string
    periodLabel: string
    dataNote: string
  }
}>

export interface AccountEditorialContent {
  profileDetailsTitle: string
  profileDetailsDescription: string
  uploadLabel: string
  uploadHelp: string
  usernameLabel: string
  usernameHelp: string
  displayNameLabel: string
  roleLabel: string
  rolePlaceholder: string
  locationLabel: string
  locationPlaceholder: string
  bioLabel: string
  bioPlaceholder: string
  resetLabel: string
  saveLabel: string
}

export type AccountPageContent = AgentConsolePage<{
  account: AccountEditorialContent
}>

export interface ProjectSettingsEditorialContent {
  generalTabLabel: string
  membersTabLabel: string
  projectNameLabel: string
  projectIdLabel: string
  projectIdHelp: string
  regionLabel: string
  regionHelp: string
  allowKeysLabel: string
  saveLabel: string
  membersDescription: string
  addMemberLabel: string
  memberColumnLabel: string
  accessColumnLabel: string
  sourceColumnLabel: string
}

export type ProjectSettingsPageContent = AgentConsolePage<{
  projectSettings: ProjectSettingsEditorialContent
}>

export interface OrganizationEditorialContent {
  generalTabLabel: string
  membersTabLabel: string
  billingTabLabel: string
  organizationNameLabel: string
  organizationIdLabel: string
  saveLabel: string
  membersDescription: string
  inviteMemberLabel: string
  currentPeriodLabel: string
  creditBalanceLabel: string
  addCreditsLabel: string
  creditBalanceDescription: string
  paymentMethodsTitle: string
  addPaymentMethodLabel: string
  invoicesTitle: string
  downloadLabel: string
  memberColumnLabel: string
  emailColumnLabel: string
  roleColumnLabel: string
  methodColumnLabel: string
  expiresColumnLabel: string
  invoiceColumnLabel: string
  periodColumnLabel: string
  amountColumnLabel: string
  statusColumnLabel: string
}

export type OrganizationPageContent = AgentConsolePage<{
  organization: OrganizationEditorialContent
}>

export type InferencePageContent = AgentConsolePage<{
  inference: {
    breadcrumbLabel: string
    deployLabel: string
    pullsLabel: string
    starsLabel: string
    lastPushLabel: string
    imagesTitle: string
    tagColumnLabel: string
    sizeColumnLabel: string
    pushedColumnLabel: string
    endpointsTitle: string
    runLocallyTitle: string
    runLocallyDescription: string
    dataNote: string
  }
}>

export type AgentConsolePageDocument =
  | HomePageContent
  | UsagePageContent
  | ApiKeysPageContent
  | ApiLogsPageContent
  | BillingPageContent
  | ComputePageContent
  | AccountPageContent
  | ProjectSettingsPageContent
  | OrganizationPageContent
  | InferencePageContent

const pageQuery = defineQuery(`
  *[_type == "agentConsolePage" && _id == $id][0] {
    _id, slug, heading, description,
    home { ..., "onboardingSteps": coalesce(onboardingSteps[]{_key, label, href}, []), "featureLinks": coalesce(featureLinks[]{_key, title, description, href, imageSrc}, []) },
    usage,
    apiKeys,
    apiLogs,
    billing { ..., "ctas": coalesce(ctas[]{_key, label, href}, []) },
    compute,
    account,
    projectSettings,
    organization,
    inference
  }
`)

const shellQuery = defineQuery(`
  *[_type == "agentConsoleShell" && _id == "agentConsoleShell"][0] {
    _id, homeAriaLabel,
    "navigation": coalesce(navigation[]{_key, label, href, "external": coalesce(external, false)}, []),
    userMenu, auth
  }
`)

const options = { next: { revalidate: 60, tags: ["agent-console-content"] } }

export async function getAgentConsolePage<T extends AgentConsolePageDocument>(
  slug: AgentConsolePageSlug
): Promise<T | null> {
  return sanityClient.fetch<T | null>(
    pageQuery,
    { id: `agentConsolePage-${slug}` },
    options
  )
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0
}

function isAgentConsoleShell(value: unknown): value is AgentConsoleShell {
  if (!value || typeof value !== "object") return false

  const shell = value as Partial<AgentConsoleShell>
  const userMenu = shell.userMenu as
    Partial<AgentConsoleShell["userMenu"]> | undefined
  const auth = shell.auth as Partial<AgentConsoleShell["auth"]> | undefined
  const userMenuFields: (keyof AgentConsoleShell["userMenu"])[] = [
    "accountLabel",
    "manageProfileLabel",
    "developerDocsLabel",
    "termsLabel",
    "helpLabel",
    "logoutLabel",
  ]
  const authFields: (keyof AgentConsoleShell["auth"])[] = [
    "dialogLabel",
    "title",
    "description",
    "googleLabel",
    "discordLabel",
    "emailDividerLabel",
    "emailInputLabel",
    "emailPlaceholder",
    "continueLabel",
  ]

  return Boolean(
    isNonEmptyString(shell._id) &&
    isNonEmptyString(shell.homeAriaLabel) &&
    shell.navigation?.length &&
    shell.navigation.every(
      (item) =>
        isNonEmptyString(item.label) &&
        isNonEmptyString(item.href) &&
        typeof item.external === "boolean"
    ) &&
    userMenu &&
    userMenuFields.every((field) => isNonEmptyString(userMenu[field])) &&
    auth &&
    authFields.every((field) => isNonEmptyString(auth[field]))
  )
}

export async function getAgentConsoleShell(): Promise<AgentConsoleShell | null> {
  const shell = await sanityClient.fetch<unknown>(shellQuery, {}, options)
  return isAgentConsoleShell(shell) ? shell : null
}
