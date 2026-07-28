import type { ComponentType } from "react"

import AccordionDemo from "./accordion-demo"
import AlertDemo from "./alert-demo"
import AlertDialogDemo from "./alert-dialog-demo"
import AvatarDemo from "./avatar-demo"
import AttachmentDemo from "./attachment-demo"
import BadgeDemo from "./badge-demo"
import BreadcrumbDemo from "./breadcrumb-demo"
import ButtonDemo from "./button-demo"
import CardDemo from "./card-demo"
import CheckboxDemo from "./checkbox-demo"
import ContextMenuDemo from "./context-menu-demo"
import DialogDemo from "./dialog-demo"
import DropdownMenuDemo from "./dropdown-menu-demo"
import InputDemo from "./input-demo"
import InputGroupDemo from "./input-group-demo"
import KbdDemo from "./kbd-demo"
import LabelDemo from "./label-demo"
import PopoverDemo from "./popover-demo"
import ProgressDemo from "./progress-demo"
import RadioGroupDemo from "./radio-group-demo"
import SelectDemo from "./select-demo"
import SeparatorDemo from "./separator-demo"
import SheetDemo from "./sheet-demo"
import SkeletonDemo from "./skeleton-demo"
import SliderDemo from "./slider-demo"
import SonnerDemo from "./sonner-demo"
import SpinnerDemo from "./spinner-demo"
import SwitchDemo from "./switch-demo"
import TableDemo from "./table-demo"
import TabsDemo from "./tabs-demo"
import TextareaDemo from "./textarea-demo"
import ToggleDemo from "./toggle-demo"
import ToggleGroupDemo from "./toggle-group-demo"
import TooltipDemo from "./tooltip-demo"
import AgentCompatibilityDemo from "./agent-compatibility-demo"
import AgentAccessSectionDemo from "./agent-access-section-demo"
import AgentCapabilitiesSectionDemo from "./agent-capabilities-section-demo"
import ApiKeyActionsDemo from "./api-key-actions-demo"
import ApiKeysSectionDemo from "./api-keys-section-demo"
import ApiLogsSectionDemo from "./api-logs-section-demo"
import BillingPageSummaryDemo from "./billing-page-summary-demo"
import BillingWorkspaceSectionDemo from "./billing-workspace-section-demo"
import ClientApplicationShellDemo from "./client-application-shell-demo"
import ClientApplicationSidebarDemo from "./client-application-sidebar-demo"
import ClientEmptyStateDemo from "./client-empty-state-demo"
import ClientInstallCommandDemo from "./client-install-command-demo"
import ClientMobileBottomNavigationDemo from "./client-mobile-bottom-navigation-demo"
import ClipCardDemo from "./clip-card-demo"
import ClipsHeaderDemo from "./clips-header-demo"
import ClipsLibraryDemo from "./clips-library-demo"
import ComputeMetricsDemo from "./compute-metrics-demo"
import ComputeWorkspaceSectionDemo from "./compute-workspace-section-demo"
import CopyButtonDemo from "./copy-button-demo"
import CreditBalanceDemo from "./credit-balance-demo"
import DailyUsageTableDemo from "./daily-usage-table-demo"
import DeleteApiKeyDialogDemo from "./delete-api-key-dialog-demo"
import EcosystemCardDemo from "./ecosystem-card-demo"
import EcosystemCatalogDemo from "./ecosystem-catalog-demo"
import InstallAgentFooterDemo from "./install-agent-footer-demo"
import InvoiceTableDemo from "./invoice-table-demo"
import LivepeerAgentAuthGateDemo from "./livepeer-agent-auth-gate-demo"
import LivepeerAgentHeroDemo from "./livepeer-agent-hero-demo"
import LivepeerAgentOnboardingSectionDemo from "./livepeer-agent-onboarding-section-demo"
import LivepeerAgentPageFrameDemo from "./livepeer-agent-page-frame-demo"
import LivepeerAgentPromoCardsDemo from "./livepeer-agent-promo-cards-demo"
import LivepeerAgentSidebarDemo from "./livepeer-agent-sidebar-demo"
import LivepeerAgentSignInCardDemo from "./livepeer-agent-sign-in-card-demo"
import MediaContextMenuDemo from "./media-context-menu-demo"
import OrchestratorTableSectionDemo from "./orchestrator-table-section-demo"
import ProjectPickerDemo from "./project-picker-demo"
import LivepeerAgentFeatureSectionDemo from "./livepeer-agent-feature-section-demo"
import LivepeerOrgFooterDemo from "./livepeer-org-footer-demo"
import LivepeerOrgHeaderDemo from "./livepeer-org-header-demo"
import LivepeerOrgMenuDemo from "./livepeer-org-menu-demo"
import PlaybookCardDemo from "./playbook-card-demo"
import PlaybookCatalogDemo from "./playbook-catalog-demo"
import PlaybookLibraryHeaderDemo from "./playbook-library-header-demo"
import PlaybooksCtaSectionDemo from "./playbooks-cta-section-demo"
import ProtocolFlowSectionDemo from "./protocol-flow-section-demo"
import ProtocolHeaderSectionDemo from "./protocol-header-section-demo"
import ProtocolPropertiesSectionDemo from "./protocol-properties-section-demo"
import ProtocolRequestFlowSectionDemo from "./protocol-request-flow-section-demo"
import ResourceUsageTableDemo from "./resource-usage-table-demo"
import SubmitEcosystemDialogDemo from "./submit-ecosystem-dialog-demo"
import UsageWorkspaceSectionDemo from "./usage-workspace-section-demo"
import UsageMetricsDemo from "./usage-metrics-demo"
import UserMenuDemo from "./user-menu-demo"
import WaitlistBackgroundHeroDemo from "./waitlist-background-hero-demo"
import WaitlistLeaderboardDemo from "./waitlist-leaderboard-demo"
import WaitlistPanelDemo from "./waitlist-panel-demo"
import WaitlistReferralLinkDemo from "./waitlist-referral-link-demo"
import WaitlistSignupFormDemo from "./waitlist-signup-form-demo"
import WaitlistStatusCardDemo from "./waitlist-status-card-demo"
import WelcomeEmailDemo from "./welcome-email-demo"
import NetworkHeroSectionDemo from "./network-hero-section-demo"
import OrchestratorCtaSectionDemo from "./orchestrator-cta-section-demo"
import CharactersWorkspaceSectionDemo from "./characters-workspace-section-demo"
import ClipsLibrarySectionDemo from "./clips-library-section-demo"
import GenerationWorkspaceSectionDemo from "./generation-workspace-section-demo"
import ProjectsWorkspaceSectionDemo from "./projects-workspace-section-demo"
import StoryboardsWorkspaceSectionDemo from "./storyboards-workspace-section-demo"

export const demos: Record<string, ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  "alert-dialog": AlertDialogDemo,
  avatar: AvatarDemo,
  attachment: AttachmentDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  "context-menu": ContextMenuDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  input: InputDemo,
  "input-group": InputGroupDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  popover: PopoverDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sheet: SheetDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  sonner: SonnerDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  tooltip: TooltipDemo,
  "agent-compatibility": AgentCompatibilityDemo,
  "agent-access-section": AgentAccessSectionDemo,
  "agent-capabilities-section": AgentCapabilitiesSectionDemo,
  "api-key-actions": ApiKeyActionsDemo,
  "api-keys-section": ApiKeysSectionDemo,
  "api-logs-section": ApiLogsSectionDemo,
  "billing-page-summary": BillingPageSummaryDemo,
  "billing-workspace-section": BillingWorkspaceSectionDemo,
  "client-application-shell": ClientApplicationShellDemo,
  "client-application-sidebar": ClientApplicationSidebarDemo,
  "client-empty-state": ClientEmptyStateDemo,
  "client-install-command": ClientInstallCommandDemo,
  "client-mobile-bottom-navigation": ClientMobileBottomNavigationDemo,
  "clip-card": ClipCardDemo,
  "clips-header": ClipsHeaderDemo,
  "clips-library": ClipsLibraryDemo,
  "compute-metrics": ComputeMetricsDemo,
  "compute-workspace-section": ComputeWorkspaceSectionDemo,
  "copy-button": CopyButtonDemo,
  "credit-balance": CreditBalanceDemo,
  "daily-usage-table": DailyUsageTableDemo,
  "delete-api-key-dialog": DeleteApiKeyDialogDemo,
  "ecosystem-card": EcosystemCardDemo,
  "ecosystem-catalog": EcosystemCatalogDemo,
  "install-agent-footer": InstallAgentFooterDemo,
  "invoice-table": InvoiceTableDemo,
  "livepeer-agent-auth-gate": LivepeerAgentAuthGateDemo,
  "livepeer-agent-hero": LivepeerAgentHeroDemo,
  "livepeer-agent-onboarding-section": LivepeerAgentOnboardingSectionDemo,
  "livepeer-agent-page-frame": LivepeerAgentPageFrameDemo,
  "livepeer-agent-promo-cards": LivepeerAgentPromoCardsDemo,
  "livepeer-agent-sidebar": LivepeerAgentSidebarDemo,
  "livepeer-agent-sign-in-card": LivepeerAgentSignInCardDemo,
  "media-context-menu": MediaContextMenuDemo,
  "orchestrator-table-section": OrchestratorTableSectionDemo,
  "project-picker": ProjectPickerDemo,
  "livepeer-agent-feature-section": LivepeerAgentFeatureSectionDemo,
  "livepeer-org-footer": LivepeerOrgFooterDemo,
  "livepeer-org-header": LivepeerOrgHeaderDemo,
  "livepeer-org-menu": LivepeerOrgMenuDemo,
  "playbook-card": PlaybookCardDemo,
  "playbook-catalog": PlaybookCatalogDemo,
  "playbook-library-header": PlaybookLibraryHeaderDemo,
  "playbooks-cta-section": PlaybooksCtaSectionDemo,
  "protocol-flow-section": ProtocolFlowSectionDemo,
  "protocol-header-section": ProtocolHeaderSectionDemo,
  "protocol-properties-section": ProtocolPropertiesSectionDemo,
  "protocol-request-flow-section": ProtocolRequestFlowSectionDemo,
  "resource-usage-table": ResourceUsageTableDemo,
  "submit-ecosystem-dialog": SubmitEcosystemDialogDemo,
  "usage-workspace-section": UsageWorkspaceSectionDemo,
  "usage-metrics": UsageMetricsDemo,
  "user-menu": UserMenuDemo,
  "waitlist-background-hero": WaitlistBackgroundHeroDemo,
  "waitlist-leaderboard": WaitlistLeaderboardDemo,
  "waitlist-panel": WaitlistPanelDemo,
  "waitlist-referral-link": WaitlistReferralLinkDemo,
  "waitlist-signup-form": WaitlistSignupFormDemo,
  "waitlist-status-card": WaitlistStatusCardDemo,
  "welcome-email": WelcomeEmailDemo,
  "network-hero-section": NetworkHeroSectionDemo,
  "orchestrator-cta-section": OrchestratorCtaSectionDemo,
  "characters-workspace-section": CharactersWorkspaceSectionDemo,
  "clips-library-section": ClipsLibrarySectionDemo,
  "generation-workspace-section": GenerationWorkspaceSectionDemo,
  "projects-workspace-section": ProjectsWorkspaceSectionDemo,
  "storyboards-workspace-section": StoryboardsWorkspaceSectionDemo,
}
