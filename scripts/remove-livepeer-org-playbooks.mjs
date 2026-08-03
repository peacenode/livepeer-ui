import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

await client
  .patch("livepeerOrgSite")
  .unset(["menuLinks[label == 'Agent Playbooks']"])
  .commit()

await client
  .patch("livepeerOrgPage-home")
  .set({
    "homeContent.agentFeature.libraryCta.href":
      "/mockups/livepeer-agent/playbooks",
  })
  .commit()

await client
  .patch("livepeerOrgPage-livepeer-agent")
  .set({
    "agentContent.capabilities.cta.href": "/mockups/livepeer-agent/playbooks",
    "agentContent.playbooks.cta.href": "/mockups/livepeer-agent/playbooks",
  })
  .commit()

console.log("Removed the Playbooks page from the Livepeer.org mockup")
