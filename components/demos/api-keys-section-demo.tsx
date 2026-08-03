import { ApiKeysSection } from "@/components/livepeer-ui/api-keys-section"
export default function ApiKeysSectionDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <ApiKeysSection
        filterPlaceholder="Filter by name…"
        paginationLabel="Page 1"
      />
    </div>
  )
}
