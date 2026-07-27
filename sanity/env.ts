const requiredEnv = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}

const projectId = requiredEnv(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)
const dataset = requiredEnv(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET
)
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-26"

export { apiVersion, dataset, projectId }
