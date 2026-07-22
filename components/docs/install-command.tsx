"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/docs/copy-button"

const packageManagers = [
  { name: "pnpm", command: "pnpm dlx" },
  { name: "npm", command: "npx" },
  { name: "yarn", command: "yarn dlx" },
  { name: "bun", command: "bunx --bun" },
]

export function InstallCommand({ url }: { url: string }) {
  return (
    <Tabs defaultValue="pnpm" className="gap-0 rounded-lg border">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-2">
        {packageManagers.map((pm) => (
          <TabsTrigger key={pm.name} value={pm.name}>
            {pm.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {packageManagers.map((pm) => {
        const command = `${pm.command} shadcn@latest add ${url}`
        return (
          <TabsContent key={pm.name} value={pm.name} className="relative">
            <CopyButton
              value={command}
              className="absolute top-1.5 right-2 bg-background/50 backdrop-blur-sm"
            />
            <div className="overflow-x-auto p-4 pr-12">
              <code className="font-mono text-[13px] whitespace-nowrap">
                {command}
              </code>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
