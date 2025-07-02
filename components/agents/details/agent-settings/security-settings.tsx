"use client"

interface SecuritySettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function SecuritySettings({
  setHasUnsavedChanges,
}: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">
          Manage access controls, API keys, and security policies.
        </p>
      </div>
      {/* Security settings content will be added here */}
    </div>
  )
}
