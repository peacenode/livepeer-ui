import { getOrchestratorsPage } from "@/lib/livepeer"

export async function GET(request: Request) {
  const cursor = new URL(request.url).searchParams.get("cursor") ?? undefined
  const page = await getOrchestratorsPage({ cursor })

  if (!page) {
    return Response.json(
      { error: "Unable to load orchestrators." },
      { status: 502 }
    )
  }

  return Response.json(page)
}
