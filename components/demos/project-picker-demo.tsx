"use client"

import { useState } from "react"

import { ProjectPicker } from "@/app/mockups/videobuddy/project-picker"

export default function ProjectPickerDemo() {
  const [project, setProject] = useState("Salt Signal")

  return (
    <ProjectPicker
      value={project}
      projects={["Salt Signal", "Black Tide", "After Hours"]}
      onChange={setProject}
      onNew={() => undefined}
    />
  )
}
