import { Studio } from "./studio"

export const dynamic = "force-dynamic"

export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  return <Studio />
}
