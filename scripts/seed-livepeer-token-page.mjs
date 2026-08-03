import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })

const document = {
  _id: "livepeerOrgPage-token",
  _type: "livepeerOrgPage",
  page: "token",
  seoTitle: "Livepeer Token",
  seoDescription:
    "Learn how Livepeer Token coordinates the network and where to get and delegate LPT.",
  tokenContent: {
    hero: {
      eyebrow: "Livepeer Token",
      metadata: "ERC-20 · Ethereum",
      heading: "The token that powers the network.",
      description:
        "Livepeer Token (LPT) is part of the coordination mechanism behind the Livepeer network — aligning incentives between the GPU providers who do the work, the applications that need video, and the stakeholders who help secure the network.",
      primaryCta: { label: "Find an Exchange", href: "#exchanges" },
      secondaryCta: { label: "Learn how it works", href: "#tokenomics" },
    },
    role: {
      eyebrow: "Tokenomics",
      heading: "The role of Livepeer token",
      introduction:
        "LPT secures and coordinates the network through staking, selection, and governance.",
      paragraphs: [
        "Orchestrators — the providers who supply compute — stake LPT as a commitment to do reliable work. The more stake behind an orchestrator, the more work it earns, but it has to keep performing to keep it. Apps pay fees for that work, which flow to the orchestrators performing it.",
        "Delegators stake LPT behind orchestrators they trust, sharing in those fees and rewards — directing capital toward the best operators. And as the governance token, LPT lets holders shape the protocol and treasury.",
      ],
    },
    exchanges: {
      eyebrow: "Exchanges",
      heading: "Get Livepeer Token",
      links: [
        {
          _key: "binance",
          label: "Binance",
          href: "https://www.binance.com/en/trade/LPT_USDT",
        },
        {
          _key: "coinbase",
          label: "Coinbase",
          href: "https://www.coinbase.com/price/livepeer",
        },
        {
          _key: "kraken",
          label: "Kraken",
          href: "https://www.kraken.com/prices/livepeer",
        },
        {
          _key: "uniswap",
          label: "Uniswap",
          href: "https://app.uniswap.org/tokens/ethereum/0x58b6a8a3302369daec383334672404ee733ab239",
        },
        {
          _key: "okx",
          label: "OKX",
          href: "https://www.okx.com/price/livepeer-lpt",
        },
      ],
    },
    delegate: {
      eyebrow: "Delegate",
      heading: "Earn rewards by staking LPT",
      description:
        "Back GPU providers you trust with your LPT and earn a share of the fees and inflation rewards they generate.",
      cta: { label: "Open Explorer", href: "https://explorer.livepeer.org/" },
    },
  },
}

await client.createOrReplace(document)
await client
  .patch("livepeerOrgSite")
  .set({
    "footerGroups[title == 'Network'].links[label == 'Livepeer Token'].href":
      "/mockups/livepeer-org/token",
  })
  .commit()
console.log(`Seeded ${document._id}`)
