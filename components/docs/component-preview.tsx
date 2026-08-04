import { CodeBlock } from "@/components/docs/code-block"
import { demos } from "@/components/demos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ComponentDocumentationSource } from "@/lib/component-docs.server"
import { cn } from "@/lib/utils"

export async function ComponentPreview({
  name,
  source,
  className,
}: {
  name: string
  source: ComponentDocumentationSource
  className?: string
}) {
  const Demo = demos[name]
  const isFullBleed =
    name === "livepeer-agent-hero" ||
    name === "install-agent-footer" ||
    name === "waitlist-background-hero"

  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <TabsList className="max-w-full overflow-x-auto">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="source">Source</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "flex min-h-[350px] w-full justify-center overflow-hidden rounded-sm border",
            isFullBleed ? "items-start p-0" : "items-center p-6 sm:p-10"
          )}
        >
          <Demo />
        </div>
      </TabsContent>
      <TabsContent value="usage">
        <CodeBlock code={source.usage} />
      </TabsContent>
      <TabsContent value="source">
        {source.files.length === 1 ? (
          <CodeBlock code={source.files[0].code} lang={source.files[0].lang} />
        ) : (
          <Tabs defaultValue="source-0" className="gap-3">
            <TabsList
              variant="line"
              className="max-w-full justify-start overflow-x-auto"
            >
              {source.files.map((file, index) => (
                <TabsTrigger
                  key={file.path}
                  value={`source-${index}`}
                  title={file.path}
                >
                  {file.path}
                </TabsTrigger>
              ))}
            </TabsList>
            {source.files.map((file, index) => (
              <TabsContent key={file.path} value={`source-${index}`}>
                <CodeBlock code={file.code} lang={file.lang} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </TabsContent>
    </Tabs>
  )
}
