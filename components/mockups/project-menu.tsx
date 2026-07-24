"use client"

import * as React from "react"
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const projects = [{ value: "default", label: "Default project" }]

export function ProjectMenu() {
  const [project, setProject] = React.useState("default")
  const selectedProject =
    projects.find((item) => item.value === project) ?? projects[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-expanded:bg-muted" />
        }
      >
        <Avatar className="size-9">
          <AvatarFallback className="bg-foreground text-background">
            D
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 text-sm leading-tight">
          <div className="truncate font-medium">{selectedProject.label}</div>
          <div className="text-muted-foreground">Project</div>
        </div>
        <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" sideOffset={8} className="w-52">
        <DropdownMenuRadioGroup value={project} onValueChange={setProject}>
          {projects.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusIcon />
          New project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
