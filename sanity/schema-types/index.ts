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
import { plannerPageContentType } from "./planner-pages"

export const schemaTypes = [
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
  plannerPageContentType,
  agentConsoleShellType,
  agentConsolePageType,
  livepeerOrgLinkType,
  livepeerOrgSiteType,
  livepeerOrgPageType,
]
