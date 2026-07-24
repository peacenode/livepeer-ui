import { redirect } from "next/navigation"

export default async function LegacyAgentRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ path?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { path = [] } = await params
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
    } else if (value !== undefined) {
      query.set(key, value)
    }
  }

  const pathname = ["/mockups/runner", ...path.map(encodeURIComponent)].join(
    "/"
  )
  const queryString = query.toString()

  redirect(queryString ? `${pathname}?${queryString}` : pathname)
}
