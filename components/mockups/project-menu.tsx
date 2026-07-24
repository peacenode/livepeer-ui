"use client"

import * as React from "react"
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react"

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
          <button className="flex h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-expanded:bg-muted" />
        }
      >
        <span className="min-w-0 flex-1 truncate font-medium">
          {selectedProject.label}
        </span>
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
