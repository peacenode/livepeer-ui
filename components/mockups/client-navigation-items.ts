import {
  ApertureIcon,
  FilmIcon,
  FolderIcon,
  Grid2X2Icon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"

export const clientNavigationItems = [
  { href: "/mockups/client", label: "Create", icon: LivepeerSymbol, brand: true },
  { href: "/mockups/client/storyboards", label: "Storyboards", icon: Grid2X2Icon, brand: false },
  { href: "/mockups/client/characters", label: "Characters", icon: ApertureIcon, brand: false },
  { href: "/mockups/client/footage", label: "Clips", icon: FilmIcon, brand: false },
  { href: "/mockups/client/projects", label: "Projects", icon: FolderIcon, brand: false },
]

export function isClientRouteActive(href: string, pathname: string) {
  return href === "/mockups/client" ? pathname === href : pathname.startsWith(href)
}
