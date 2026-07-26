import { createDesignMarkdown } from "@/lib/design-md"
import { siteConfig } from "@/lib/docs"

export const dynamic = "force-static"

export function GET() {
  return new Response(createDesignMarkdown(siteConfig.baseUrl), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
