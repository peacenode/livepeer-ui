import "server-only"

const encoder = new TextEncoder()

export const PLANNER_ACCESS_COOKIE = "livepeer_planner_access"
export const PLANNER_ACCESS_MAX_AGE = 60 * 60 * 24 * 7

function plannerPassword() {
  return process.env.PLANNER_PASSWORD?.trim() || null
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "")
}

async function digest(value: string) {
  return new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(value))
  )
}

async function signature(payload: string, password: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  return bytesToBase64Url(
    new Uint8Array(
      await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
    )
  )
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) return false

  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index]
  }
  return difference === 0
}

export function isPlannerAccessConfigured() {
  return plannerPassword() !== null
}

export async function verifyPlannerPassword(candidate: string) {
  const password = plannerPassword()
  if (!password) return false

  return constantTimeEqual(await digest(candidate), await digest(password))
}

export async function createPlannerSession() {
  const password = plannerPassword()
  if (!password) throw new Error("Planner access is not configured")

  const expiresAt = Date.now() + PLANNER_ACCESS_MAX_AGE * 1000
  const payload = String(expiresAt)
  return `${payload}.${await signature(payload, password)}`
}

export async function verifyPlannerSession(token: string | undefined) {
  const password = plannerPassword()
  if (!password || !token) return false

  const separator = token.indexOf(".")
  if (separator === -1) return false

  const payload = token.slice(0, separator)
  const suppliedSignature = token.slice(separator + 1)
  const expiresAt = Number(payload)

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false

  const expectedSignature = await signature(payload, password)
  return constantTimeEqual(
    encoder.encode(suppliedSignature),
    encoder.encode(expectedSignature)
  )
}

export function safePlannerDestination(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/marketing/planner"
  if (!value.startsWith("/marketing/planner")) return "/marketing/planner"
  if (value.startsWith("//")) return "/marketing/planner"
  return value
}
