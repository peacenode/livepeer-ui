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
}
