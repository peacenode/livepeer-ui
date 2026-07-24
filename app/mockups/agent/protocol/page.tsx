import type { Metadata } from "next"
import {
  ArrowRightIcon,
  BlocksIcon,
  CpuIcon,
  NetworkIcon,
  ShieldCheckIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Livepeer Protocol",
}

const roles = [
  {
    name: "Gateways",
    description:
      "Accept requests from applications, discover available orchestrators, route jobs, and check returned work.",
  },
  {
    name: "Orchestrators",
    description:
      "Independent GPU operators that perform video transcoding and AI inference in exchange for fees.",
  },
  {
    name: "Delegators",
    description:
      "LPT holders who stake toward orchestrators they trust, helping secure and coordinate the active network.",
  },
]

export default function ProtocolPage() {
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="max-w-3xl">
          <p className="text-sm text-muted-foreground">Livepeer</p>
          <h1 className="mt-2 text-3xl font-medium text-balance">
            An open network for video compute
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Livepeer coordinates independent GPU operators to generate,
            transform, analyze, transcode, and stream video. Applications send
            work through gateways while the protocol handles discovery,
            payments, verification, and economic security.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-lg font-medium">How a request moves</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <ProtocolStep
              icon={NetworkIcon}
              title="Application"
              text="Submits a video or AI workload through a gateway."
            />
            <ArrowRightIcon className="hidden size-4 text-muted-foreground md:block" />
            <ProtocolStep
              icon={CpuIcon}
              title="GPU network"
              text="An orchestrator runs the requested inference or video job."
            />
            <ArrowRightIcon className="hidden size-4 text-muted-foreground md:block" />
            <ProtocolStep
              icon={ShieldCheckIcon}
              title="Result"
              text="The gateway checks and returns the completed media."
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-lg font-medium">Network roles</h2>
          <div className="mt-4">
            {roles.map((role) => (
              <div
                key={role.name}
                className="grid gap-2 border-t py-5 first:border-t-0 sm:grid-cols-[160px_1fr]"
              >
                <h3 className="text-sm font-medium">{role.name}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <BlocksIcon className="size-5" />
            <h2 className="mt-3 text-lg font-medium">Layered by design</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              High-throughput video and AI work happens off-chain. Contracts on
              Arbitrum One coordinate stake, payments, governance, and the
              active set, while gateways and orchestrators handle job traffic
              directly.
            </p>
          </div>
          <div>
            <CpuIcon className="size-5" />
            <h2 className="mt-3 text-lg font-medium">
              How this workspace connects
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Storyboards, characters, footage, and projects organize creative
              inputs. A generation request can be routed to network compute,
              and the returned renders can be reviewed, rerolled, or promoted
              into a project&apos;s finals.
            </p>
          </div>
        </section>

        <div className="mt-14 border-t pt-6">
          <a
            href="https://docs.livepeer.org/v2/about/protocol/architecture"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            Read the protocol architecture
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </main>
  )
}

function ProtocolStep({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof NetworkIcon
  title: string
  text: string
}) {
  return (
    <div className="min-h-36 rounded-xl bg-muted p-5">
      <Icon className="size-5" />
      <h3 className="mt-5 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  )
}
