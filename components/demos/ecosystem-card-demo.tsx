import { EcosystemCard } from "@/components/mockups/ecosystem-card"

const app = {
  name: "Daydream",
  domain: "daydream.live",
  href: "https://daydream.live",
  description:
    "Open-source, local-first platform for running real-time interactive generative AI video pipelines.",
  image: "/ecosystem/20260726-1500/daydream.svg",
  tags: ["AI Video", "Generative", "API"],
}

export default function EcosystemCardDemo() {
  return (
    <div className="w-full max-w-md">
      <EcosystemCard app={app} />
    </div>
  )
}
