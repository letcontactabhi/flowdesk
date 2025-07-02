"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Copy, HelpCircle, Trash2 } from "lucide-react"
import { useState } from "react"

interface GeneralSettingsProps {
  agent: {
    id: string
    agentId: string
    name: string
    size: string
    creditLimit: boolean
  }
  setHasUnsavedChanges: (value: boolean) => void
}

export function GeneralSettings({
  agent,
  setHasUnsavedChanges,
}: GeneralSettingsProps) {
  const [agentName, setAgentName] = useState(agent.name)
  const [creditLimit, setCreditLimit] = useState(agent.creditLimit)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">General</h2>
      </div>

      <div className="space-y-6">
        {/* Agent ID */}
        <div className="space-y-2">
          <Label htmlFor="agent-id">Agent ID</Label>
          <div className="flex gap-2">
            <Input
              id="agent-id"
              value={agent.agentId}
              readOnly
              className="font-mono"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(agent.agentId)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label htmlFor="agent-size">Size</Label>
          <Input
            id="agent-size"
            value={agent.size}
            readOnly
            className="bg-muted"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name">Name</Label>
          <Input
            id="agent-name"
            value={agentName}
            onChange={(e) => {
              setAgentName(e.target.value)
              setHasUnsavedChanges(true)
            }}
            placeholder="Enter agent name"
          />
        </div>

        {/* Credit Limit */}
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="credit-limit">Credit limit</Label>
              <HelpCircle className="text-muted-foreground h-4 w-4" />
            </div>
          </div>
          <Switch
            id="credit-limit"
            checked={creditLimit}
            onCheckedChange={(checked) => {
              setCreditLimit(checked)
              setHasUnsavedChanges(true)
            }}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium text-red-500">DANGER ZONE</span>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-red-900 dark:text-red-100">
                Delete Agent
              </h3>
              <p className="text-sm text-red-700 dark:text-red-200">
                Once you delete an agent, there is no going back. Please be
                certain.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
