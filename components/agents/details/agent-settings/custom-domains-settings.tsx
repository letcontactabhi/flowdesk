"use client"

interface CustomDomainsSettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function CustomDomainsSettings({
  setHasUnsavedChanges,
}: CustomDomainsSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Custom Domains</h2>
        <p className="text-muted-foreground">
          Configure custom domains and white-label chat widget embedding.
        </p>
      </div>
      {/* Custom domain settings content will be added here */}
    </div>
  )
}
