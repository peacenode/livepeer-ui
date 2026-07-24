import type { Metadata } from "next"
import { PlusIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
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
import { workflows } from "@/lib/workflows"

export const metadata: Metadata = {
  title: "Workflows",
}

const numberFormatter = new Intl.NumberFormat("en-US")

export default function WorkflowsPage() {
  return (
    <PlatformPage
      title="Workflows"
      action={
        <Button size="lg" className="px-5 font-medium">
          <PlusIcon />
          Create workflow
        </Button>
      }
    >
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Workflows are reusable media operations that Runner can call from the
        CLI, MCP, or API.
      </p>
      <div className="border-y md:hidden">
        {workflows.map((workflow) => (
          <div
            key={workflow.slug}
            className="flex flex-col gap-3 border-b py-5 last:border-b-0"
          >
            <div>
              <p className="font-medium">{workflow.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {workflow.description}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Badge variant="secondary">{workflow.kind}</Badge>
              <p className="text-sm tabular-nums">
                {numberFormatter.format(workflow.runs)}
                <span className="ml-1 text-muted-foreground">runs</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead className="text-right">Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.slug}>
                <TableCell>
                  <div className="flex max-w-xl flex-col gap-1 py-1">
                    <span className="font-medium">{workflow.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {workflow.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{workflow.kind}</Badge>
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">
                  {workflow.createdAt}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {numberFormatter.format(workflow.runs)}
                  <span className="ml-1 text-muted-foreground">runs</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PlatformPage>
  )
}
