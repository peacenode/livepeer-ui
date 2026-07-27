import { NextResponse, type NextRequest } from "next/server"

import { PLANNER_ACCESS_COOKIE, verifyPlannerSession } from "@/lib/planner-auth"

export async function proxy(request: NextRequest) {
  const session = request.cookies.get(PLANNER_ACCESS_COOKIE)?.value
  if (await verifyPlannerSession(session)) return NextResponse.next()

  const accessUrl = new URL("/planner-access", request.url)
  accessUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  )
  return NextResponse.redirect(accessUrl)
}

export const config = {
  matcher: "/marketing/planner/:path*",
}
