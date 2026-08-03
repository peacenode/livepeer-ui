import { EcosystemCard } from "@/components/livepeer-ui/ecosystem-card"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"

const app = {
  name: "Daydream",
  domain: "daydream.live",
  href: "https://daydream.live",
  description:
    "Open-source, local-first platform for running real-time interactive generative AI video pipelines.",
  image: sanityStaticAssets.daydream,
  tags: ["AI Video", "Generative", "API"],
}

export default function EcosystemCardDemo() {
  return (
    <div className="w-full max-w-md">
      <EcosystemCard app={app} />
    </div>
  )
}
