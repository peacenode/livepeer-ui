import { FilmIcon } from "lucide-react"
import { ClientEmptyState } from "@/components/livepeer-ui/client-empty-state"

export default function ClientEmptyStateDemo() {
  return <ClientEmptyState icon={FilmIcon} title="No clips yet" />
}
