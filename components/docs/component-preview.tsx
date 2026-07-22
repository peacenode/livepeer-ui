import fs from "node:fs"
import path from "node:path"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/docs/code-block"
import { demos } from "@/components/demos"

export function ComponentPreview({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Demo = demos[name]
  const code = fs.readFileSync(
    path.join(process.cwd(), "components/demos", `${name}-demo.tsx`),
    "utf8"
  )

  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex min-h-[350px] w-full items-center justify-center rounded-lg border p-6 sm:p-10">
          <Demo />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  )
}
