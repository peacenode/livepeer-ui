import { PlatformAuthGate } from "@/components/mockups/platform-auth-gate"

export default function LivepeerAgentAuthGateDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden border">
      <PlatformAuthGate contained>
        <div className="h-full bg-muted/30" />
      </PlatformAuthGate>
    </div>
  )
}
