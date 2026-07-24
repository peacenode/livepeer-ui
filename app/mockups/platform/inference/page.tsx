import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getAiGateways,
  getNetworkContainers,
  shortAddress,
} from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Inference",
}

export default async function MockupInferencePage() {
  const [containers, gateways] = await Promise.all([
    getNetworkContainers(),
    getAiGateways(),
  ])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Inference</h1>
          <p className="text-sm text-muted-foreground">
            Containers exposed on the Livepeer AI network.
          </p>
        </div>
        <Button>New pipeline</Button>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Network containers</h2>
        {containers.length === 0 ? (
          <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-balance text-muted-foreground">
            Container advertisements come from a gateway&rsquo;s{" "}
            <code className="font-mono text-xs">getNetworkCapabilities</code>{" "}
            feed. No public gateway is reachable right now — point{" "}
            <code className="font-mono text-xs">LIVEPEER_GATEWAY_URL</code> at
            an AI gateway to populate this table.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orchestrator</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Price / unit</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containers.map((container, index) => (
                <TableRow
                  key={`${container.orchestrator}-${container.modelId}-${index}`}
                >
                  <TableCell className="font-mono text-xs">
                    {container.orchestrator.startsWith("0x")
                      ? shortAddress(container.orchestrator)
                      : container.orchestrator}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {container.pipeline}
                  </TableCell>
                  <TableCell className="max-w-56 truncate font-mono text-xs text-muted-foreground">
                    {container.modelId}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {container.pricePerUnit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={container.warm ? "secondary" : "outline"}>
                      {container.warm ? "Warm" : "Cold"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">AI gateways</h2>
        {gateways.length === 0 ? (
          <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            Gateway data is unavailable right now.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gateway</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Deposit</TableHead>
                <TableHead className="text-right">Reserve</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gateways.map((gateway) => (
                <TableRow key={gateway.address}>
                  <TableCell className="font-medium">{gateway.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {shortAddress(gateway.address)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {gateway.depositEth.toFixed(3)} ETH
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {gateway.reserveEth.toFixed(3)} ETH
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Gateways from the on-chain registry, cached for 10 minutes. Container
        listings require a connected AI gateway.
      </p>
    </div>
  )
}
