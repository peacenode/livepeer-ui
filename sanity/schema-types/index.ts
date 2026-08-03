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
import { welcomeEmailContentType } from "./welcome-email-content"
import { agentRolloutFlowType } from "./agent-rollout-flow"
import { livepeerBlogPostType } from "./livepeer-blog-post"
import { socialAssetSetType } from "./social-assets"

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
  welcomeEmailContentType,
  agentConsoleShellType,
  agentConsolePageType,
  livepeerOrgLinkType,
  livepeerOrgSiteType,
  livepeerOrgPageType,
  livepeerBlogPostType,
  socialAssetSetType,
]
