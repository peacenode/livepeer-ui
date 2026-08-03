import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })
const site = await client.fetch(
  `*[_type == "livepeerOrgSite" && _id == "livepeerOrgSite"][0]{menuLinks}`
)

if (!site)
  throw new Error('Required Sanity document "livepeerOrgSite" is missing.')

const additions = {
  "Livepeer Token": {
    _key: "token",
    _type: "livepeerOrgLink",
    label: "Livepeer Token",
    href: "/mockups/livepeer-org/token",
  },
  Foundation: {
    _key: "foundation",
    _type: "livepeerOrgLink",
    label: "Foundation",
    href: "/mockups/livepeer-org/foundation",
  },
}

const menuLinks = (site.menuLinks ?? []).filter(
  (link) =>
    !["Livepeer Token", "Foundation", "Agent Playbooks"].includes(link.label)
)

const ecosystemIndex = menuLinks.findIndex((link) => link.label === "Ecosystem")
menuLinks.splice(ecosystemIndex + 1, 0, additions["Livepeer Token"])

const blogIndex = menuLinks.findIndex((link) => link.label === "Blog")
menuLinks.splice(
  blogIndex >= 0 ? blogIndex + 1 : menuLinks.length,
  0,
  additions.Foundation
)

await client.patch("livepeerOrgSite").set({ menuLinks }).commit()
console.log(menuLinks.map(({ label, href }) => `${label}: ${href}`).join("\n"))
