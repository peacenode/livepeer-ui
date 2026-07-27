import {
  marketingItemType,
  marketingLinkType,
  marketingWeekType,
} from "./marketing-week"
import {
  plannerConstraintType,
  plannerMarkdownDocumentType,
  plannerOutreachType,
} from "./planner-content"
import {
  agentConsoleEditorialPageType,
  mockupPageType,
  mockupRoundupType,
  registryCtaType,
} from "./registry-content"
import {
  agentConsolePageType,
  agentConsoleShellType,
} from "./agent-console-pages"
import {
  livepeerOrgLinkType,
  livepeerOrgPageType,
  livepeerOrgSiteType,
} from "./livepeer-org-pages"
import { waitlistPageContentType } from "./waitlist-content"
import { agentRolloutFlowType } from "./agent-rollout-flow"

export const schemaTypes = [
  agentRolloutFlowType,
  marketingLinkType,
  marketingItemType,
  marketingWeekType,
  plannerOutreachType,
  plannerConstraintType,
  plannerMarkdownDocumentType,
  registryCtaType,
  mockupPageType,
  mockupRoundupType,
  agentConsoleEditorialPageType,
  waitlistPageContentType,
  agentConsoleShellType,
  agentConsolePageType,
  livepeerOrgLinkType,
  livepeerOrgSiteType,
  livepeerOrgPageType,
]
