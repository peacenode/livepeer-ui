import type { Metadata } from "next"

import { CharactersWorkspace } from "./characters-workspace"

export const metadata: Metadata = {
  title: "Characters - Livepeer",
}

export default function CharactersPage() {
  return <CharactersWorkspace />
}
