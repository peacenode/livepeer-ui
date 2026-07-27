"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

const packageManagers = [
  { name: "pnpm", command: "pnpm dlx" },
  { name: "npm", command: "npx" },
  { name: "yarn", command: "yarn dlx" },
  { name: "bun", command: "bunx --bun" },
]

export function InstallCommand({ url }: { url: string }) {
  return (
    <Tabs defaultValue="pnpm" className="gap-3">
      <TabsList>
        {packageManagers.map((pm) => (
          <TabsTrigger key={pm.name} value={pm.name}>
            {pm.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {packageManagers.map((pm) => {
        const command = `${pm.command} shadcn@latest add ${url}`
        return (
          <TabsContent key={pm.name} value={pm.name}>
            <div className="flex w-fit max-w-full items-center gap-1 rounded-lg border bg-muted/30 py-1 pr-1 pl-4">
              <code className="overflow-x-auto font-mono text-[13px] whitespace-nowrap">
                {command}
              </code>
              <CopyButton value={command} className="shrink-0" />
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
