import type { Metadata } from "next"

import { EntityPage } from "../entity-page"

export const metadata: Metadata = {
  title: "Projects - Livepeer",
}

export default function ProjectsPage() {
  return <EntityPage type="projects" />
}
