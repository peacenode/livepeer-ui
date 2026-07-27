import { ApiKeyActions } from "@/components/mockups/api-key-actions"

export default function ApiKeyActionsDemo() {
  return (
    <ApiKeyActions
      content={{
        newKeyLabel: "New API key",
        dialogTitle: "Create API key",
        dialogDescription:
          "Name this key so you can identify where it is being used.",
        keyNameLabel: "Key name",
        keyNamePlaceholder: "Production, staging, local development…",
        cancelLabel: "Cancel",
        generateLabel: "Generate key",
      }}
    />
  )
}
