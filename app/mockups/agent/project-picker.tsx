"use client"

import { ChevronDownIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProjectPicker({
  value,
  projects,
  onChange,
  onNew,
}: {
  value: string
  projects: string[]
  onChange: (project: string) => void
  onNew: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" className="max-w-44" />}
      >
        <span className="truncate">{value}</span>
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Project</DropdownMenuLabel>
          {projects.map((project) => (
            <DropdownMenuItem
              key={project}
              onClick={() => onChange(project)}
            >
              {project}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={onNew}>
            <PlusIcon />
            New project
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
