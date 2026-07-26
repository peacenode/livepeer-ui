import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
}: {
  code: string
  lang?: string
  className?: string
}) {
  const html = await codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })

  return (
    <div className={cn("relative", className)}>
      <CopyButton
        value={code}
        className="absolute top-2 right-2 z-10 bg-muted/50 backdrop-blur-sm"
      />
      <div
        className="max-h-[500px] overflow-auto rounded-lg border bg-muted/30 text-[13px] leading-relaxed [&_pre]:min-w-max [&_pre]:p-4 [&_pre]:pr-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
