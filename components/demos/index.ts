import type { ComponentType } from "react"

import AccordionDemo from "./accordion-demo"
import AlertDemo from "./alert-demo"
import AlertDialogDemo from "./alert-dialog-demo"
import AvatarDemo from "./avatar-demo"
import BadgeDemo from "./badge-demo"
import BreadcrumbDemo from "./breadcrumb-demo"
import ButtonDemo from "./button-demo"
import CardDemo from "./card-demo"
import CheckboxDemo from "./checkbox-demo"
import DialogDemo from "./dialog-demo"
import DropdownMenuDemo from "./dropdown-menu-demo"
import InputDemo from "./input-demo"
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
import LivepeerAgentHeroDemo from "./livepeer-agent-hero-demo"
import LivepeerAgentMobileNavDemo from "./livepeer-agent-mobile-nav-demo"
import LivepeerAgentOnboardingSectionDemo from "./livepeer-agent-onboarding-section-demo"
import LivepeerAgentPageFrameDemo from "./livepeer-agent-page-frame-demo"
import LivepeerAgentSidebarDemo from "./livepeer-agent-sidebar-demo"
import LivepeerAgentSignInCardDemo from "./livepeer-agent-sign-in-card-demo"
import LivepeerCubeStreamDemo from "./livepeer-cube-stream-demo"
import MediaContextMenuDemo from "./media-context-menu-demo"
import OrchestratorTableSectionDemo from "./orchestrator-table-section-demo"
import ProjectPickerDemo from "./project-picker-demo"
import RunnerDeltaStreamDemo from "./runner-delta-stream-demo"

export const demos: Record<string, ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  "alert-dialog": AlertDialogDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  input: InputDemo,
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
  "livepeer-agent-hero": LivepeerAgentHeroDemo,
  "livepeer-agent-mobile-nav": LivepeerAgentMobileNavDemo,
  "livepeer-agent-onboarding-section": LivepeerAgentOnboardingSectionDemo,
  "livepeer-agent-page-frame": LivepeerAgentPageFrameDemo,
  "livepeer-agent-sidebar": LivepeerAgentSidebarDemo,
  "livepeer-agent-sign-in-card": LivepeerAgentSignInCardDemo,
  "livepeer-cube-stream": LivepeerCubeStreamDemo,
  "media-context-menu": MediaContextMenuDemo,
  "orchestrator-table-section": OrchestratorTableSectionDemo,
  "project-picker": ProjectPickerDemo,
  "runner-delta-stream": RunnerDeltaStreamDemo,
}
