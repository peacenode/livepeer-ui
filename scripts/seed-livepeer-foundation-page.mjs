import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const document = {
  _id: "livepeerOrgPage-foundation",
  _type: "livepeerOrgPage",
  page: "foundation",
  seoTitle: "Foundation",
  seoDescription:
    "Learn how the Livepeer Foundation supports the long-term health, development, and growth of the Livepeer network.",
  foundationContent: {
    hero: {
      eyebrow: "The Livepeer Foundation",
      heading: "Advancing the open network for real-time AI video",
      description:
        "The Livepeer Foundation is an independent non-profit created to ensure the protocol’s long-term health, fund core development, set strategic direction and protect the ecosystem’s interests.",
    },
    about: {
      eyebrow: "01 / The Foundation",
      heading: "About The Foundation",
      establishedLink: {
        label: "Established in 2025",
        href: "https://livepeer.org/blog/introducing-the-livepeer-foundation",
      },
      description:
        ", the Livepeer Foundation is a non-profit entity accountable to the network’s participants. Its mandate is the long-term health of the Livepeer network, through strategy, core development and ecosystem growth.",
    },
    responsibilities: {
      eyebrow: "02 / What We Do",
      heading: "What We Do",
      items: [
        {
          _key: "strategy",
          heading: "Strategy.",
          description:
            "We set the strategic direction of the network and align stakeholders around a long-term roadmap of priority work.",
        },
        {
          _key: "coordination",
          heading: "Coordination.",
          description:
            "We coordinate technical development across independent teams building on and for the network.",
        },
        {
          _key: "support",
          heading: "Support.",
          description:
            "We support builders through funding, connections and tools that lower the barrier to building.",
        },
      ],
      cta: {
        label: "Explore the ecosystem",
        href: "/mockups/playbooks/ecosystem",
      },
    },
    project: {
      eyebrow: "03 / The Project",
      heading: "About The Project",
      paragraphs: [
        "Livepeer was founded in 2017 by Doug Petkanics and Eric Tang to solve a straightforward problem: video infrastructure was expensive, centralised, and controlled by a handful of companies. They built an open alternative, where a global network of GPU operators processes video at scale, is owned and run by its participants and available to anyone.",
        "Eight years on, builders discovered that Livepeer’s low-latency GPU infrastructure was what the emerging wave of real-time AI video applications needed. The network’s operators were already running the hardware when the demand arrived. As of early 2026, 72% of network fees come from AI inference workloads.",
        "The network is now a proving ground for builders experimenting at the bleeding edge of real-time video and AI. Live video streams analysed and acted on as they happen, entire worlds generated in real time and AI avatars that see, speak and respond. Livepeer’s roots are in transcoding and streaming, but the focus is clear: be the open network for real-time AI video.",
      ],
      feesLink: {
        label: "State of Livepeer Q4 2025",
        href: "https://messari.io/report/state-of-livepeer-q4-2025",
      },
    },
  },
}

await client.createOrReplace(document)
console.log(`Seeded ${document._id}`)
