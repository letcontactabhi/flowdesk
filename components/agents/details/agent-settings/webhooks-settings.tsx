"use client"

interface WebhooksSettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function WebhooksSettings({
  setHasUnsavedChanges,
}: WebhooksSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Webhooks</h2>
        <p className="text-muted-foreground">
          Set up webhook endpoints for external integrations and events.
        </p>
      </div>
      {/* Webhook settings content will be added here */}
    </div>
  )
}
