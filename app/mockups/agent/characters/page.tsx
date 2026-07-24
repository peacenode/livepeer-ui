import type { Metadata } from "next"

import { EntityPage } from "../entity-page"

export const metadata: Metadata = {
  title: "Characters - Livepeer",
}

export default function CharactersPage() {
  return <EntityPage type="characters" />
}
