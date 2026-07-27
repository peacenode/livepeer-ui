"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  createPlannerSession,
  PLANNER_ACCESS_COOKIE,
  PLANNER_ACCESS_MAX_AGE,
  safePlannerDestination,
  verifyPlannerPassword,
} from "@/lib/planner-auth"

export async function unlockPlanner(formData: FormData) {
  const destination = safePlannerDestination(formData.get("next"))
  const password = formData.get("password")

  if (
    typeof password !== "string" ||
    !(await verifyPlannerPassword(password))
  ) {
    const accessUrl = new URL("http://local/planner-access")
    accessUrl.searchParams.set("error", "invalid")
    accessUrl.searchParams.set("next", destination)
    redirect(`${accessUrl.pathname}${accessUrl.search}`)
  }

  const cookieStore = await cookies()
  cookieStore.set(PLANNER_ACCESS_COOKIE, await createPlannerSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PLANNER_ACCESS_MAX_AGE,
    path: "/marketing/planner",
    priority: "high",
  })

  redirect(destination)
}
