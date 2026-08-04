"use client"

import Link from "next/link"
import {
  BookOpenIcon,
  CircleUserRoundIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  NotepadTextIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type {
  AgentConsoleShell,
  AgentConsoleUser,
} from "@/components/livepeer-ui/contracts"

const themes = [
  { value: "system", label: "System theme", icon: MonitorIcon },
  { value: "light", label: "Light theme", icon: SunIcon },
  { value: "dark", label: "Dark theme", icon: MoonIcon },
]

export function UserMenu({
  content,
  user,
  profileHref = "/mockups/livepeer-agent/account",
}: {
  content: AgentConsoleShell["userMenu"]
  user: AgentConsoleUser
  profileHref?: string
}) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-expanded:bg-muted" />
        }
      >
        <Avatar className="size-9">
          <AvatarFallback className="bg-foreground text-background">
            P
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm leading-tight">
          <span className="font-medium">{user.username}</span>
          <span className="text-muted-foreground">{content.accountLabel}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" sideOffset={8} className="w-60">
        <div className="flex flex-col gap-2 px-2 pt-1.5 pb-2">
          <span className="truncate text-sm text-muted-foreground">
            {user.email}
          </span>
          <ToggleGroup
            value={[theme ?? "system"]}
            onValueChange={(value) => {
              if (value[0]) setTheme(value[0])
            }}
            className="rounded-sm bg-muted p-0.5"
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                size="sm"
                aria-label={label}
                className="flex-1 data-[state=on]:bg-background data-[state=on]:shadow-xs"
              >
                <Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link href={profileHref} />}
        >
          <CircleUserRoundIcon />
          {content.manageProfileLabel}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BookOpenIcon />
          {content.developerDocsLabel}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NotepadTextIcon />
          {content.termsLabel}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoyIcon />
          {content.helpLabel}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          {content.logoutLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
