import {
  marketingItemType,
  marketingLinkType,
  marketingWeekType,
} from "./marketing-week"
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
