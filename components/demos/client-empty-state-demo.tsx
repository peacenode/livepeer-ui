import { FilmIcon } from "lucide-react"
import { ClientEmptyState } from "@/components/mockups/client-empty-state"

export default function ClientEmptyStateDemo() {
  return <ClientEmptyState icon={FilmIcon} title="No clips yet" />
}
