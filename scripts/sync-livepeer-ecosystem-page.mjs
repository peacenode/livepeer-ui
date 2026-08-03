import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

await client
  .patch("livepeerOrgPage-ecosystem")
  .set({ "ecosystemContent.searchPlaceholder": "Search ecosystem" })
  .commit()

console.log('Updated the Ecosystem search label to "Search ecosystem"')
