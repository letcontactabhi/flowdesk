"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Brain,
  MessageSquare,
  Shield,
  Bell,
  Webhook,
  Globe,
  Circle,
  Copy,
  HelpCircle,
  Trash2,
} from "lucide-react"
import { useState } from "react"

const settingsNavItems = [
  { id: "general", label: "General", icon: User },
  { id: "ai", label: "AI", icon: Brain },
  { id: "chat-interface", label: "Chat Interface", icon: MessageSquare },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "custom-domains", label: "Custom Domains", icon: Globe },
]

interface AgentSettingsProps {
  agent: {
    id: string
    agentId: string
    name: string
    size: string
    creditLimit: boolean
  }
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (value: boolean) => void
}

export function AgentSettings({
  agent,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}: AgentSettingsProps) {
  const [activeSettingsSection, setActiveSettingsSection] = useState("general")
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
    <div className="flex h-full min-h-[600px]">
      {/* Mobile Settings Navigation */}
      <div className="mb-6 w-full px-6 pt-6 md:hidden">
        <Select
          value={activeSettingsSection}
          onValueChange={setActiveSettingsSection}
        >
          <SelectTrigger>
            <SelectValue>
              {
                settingsNavItems.find(
                  (item) => item.id === activeSettingsSection
                )?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {settingsNavItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Settings Sidebar Navigation */}
      <div className="bg-muted/10 hidden w-64 flex-col border-r md:flex">
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {settingsNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSettingsSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm font-medium transition-all ${
                  activeSettingsSection === item.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
                aria-current={
                  activeSettingsSection === item.id ? "page" : undefined
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex flex-1 flex-col">
        <div className="p-6 pb-20 md:p-6">
          {activeSettingsSection === "general" && (
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
                  <span className="text-sm font-medium text-red-500">
                    DANGER ZONE
                  </span>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-red-900 dark:text-red-100">
                        Delete Agent
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-200">
                        Once you delete an agent, there is no going back. Please
                        be certain.
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
          )}

          {activeSettingsSection === "ai" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">AI</h2>
              </div>

              <div className="space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <Label htmlFor="ai-model">Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">
                        GPT-3.5 Turbo
                      </SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    defaultValue="0.7"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                  <p className="text-muted-foreground text-sm">
                    Controls randomness: 0 is focused, 2 is creative
                  </p>
                </div>

                {/* System Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    rows={6}
                    defaultValue="You are a helpful customer support agent for our company. Be friendly, professional, and provide accurate information based on our knowledge base."
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>

                {/* Max Tokens */}
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min="1"
                    max="4096"
                    defaultValue="1000"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                  <p className="text-muted-foreground text-sm">
                    Maximum length of the AI response
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSettingsSection === "chat-interface" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Chat Interface</h2>
              </div>

              <div className="space-y-6">
                {/* Widget Title */}
                <div className="space-y-2">
                  <Label htmlFor="widget-title">Widget Title</Label>
                  <Input
                    id="widget-title"
                    defaultValue="How can we help you?"
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>

                {/* Welcome Message */}
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea
                    id="welcome-message"
                    rows={3}
                    defaultValue="Hi there! 👋 I'm here to help answer your questions."
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>

                {/* Primary Color */}
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      defaultValue="#0066cc"
                      className="w-20"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                    <Input
                      defaultValue="#0066cc"
                      className="font-mono"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="widget-position">Widget Position</Label>
                  <Select defaultValue="bottom-right">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Agent Avatar */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="show-avatar">Show Agent Avatar</Label>
                    <p className="text-muted-foreground text-sm">
                      Display agent avatar in chat messages
                    </p>
                  </div>
                  <Switch
                    id="show-avatar"
                    defaultChecked={true}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </div>

                {/* Sound Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sound-notifications">
                      Sound Notifications
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Play sound when new messages arrive
                    </p>
                  </div>
                  <Switch
                    id="sound-notifications"
                    defaultChecked={false}
                    onCheckedChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSettingsSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Security Settings</h2>
                <p className="text-muted-foreground">
                  Manage access controls, API keys, and security policies.
                </p>
              </div>
              {/* Security settings */}
            </div>
          )}

          {activeSettingsSection === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Notifications</h2>
                <p className="text-muted-foreground">
                  Configure email alerts, escalation rules, and notification
                  preferences.
                </p>
              </div>
              {/* Notification settings */}
            </div>
          )}

          {activeSettingsSection === "webhooks" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Webhooks</h2>
                <p className="text-muted-foreground">
                  Set up webhook endpoints for external integrations and events.
                </p>
              </div>
              {/* Webhook settings */}
            </div>
          )}

          {activeSettingsSection === "custom-domains" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Custom Domains</h2>
                <p className="text-muted-foreground">
                  Configure custom domains and white-label chat widget
                  embedding.
                </p>
              </div>
              {/* Custom domain settings */}
            </div>
          )}
        </div>

        {/* Sticky Save Button */}
        {hasUnsavedChanges && (
          <div className="bg-background sticky bottom-0 flex justify-end border-t p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setHasUnsavedChanges(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setHasUnsavedChanges(false)}>
                Save changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
