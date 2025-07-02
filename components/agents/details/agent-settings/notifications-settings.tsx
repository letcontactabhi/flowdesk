"use client"

interface NotificationsSettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function NotificationsSettings({
  setHasUnsavedChanges,
}: NotificationsSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="text-muted-foreground">
          Configure email alerts, escalation rules, and notification
          preferences.
        </p>
      </div>
      {/* Notification settings content will be added here */}
    </div>
  )
}
