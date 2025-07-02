"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Brain,
  MessageSquare,
  Shield,
  Bell,
  Webhook,
  Globe,
} from "lucide-react"
import { useState } from "react"
import {
  GeneralSettings,
  AISettings,
  ChatInterfaceSettings,
  SecuritySettings,
  NotificationsSettings,
  WebhooksSettings,
  CustomDomainsSettings,
} from "./agent-settings/"

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
            <GeneralSettings
              agent={agent}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {activeSettingsSection === "ai" && (
            <AISettings setHasUnsavedChanges={setHasUnsavedChanges} />
          )}

          {activeSettingsSection === "chat-interface" && (
            <ChatInterfaceSettings
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {activeSettingsSection === "security" && (
            <SecuritySettings setHasUnsavedChanges={setHasUnsavedChanges} />
          )}

          {activeSettingsSection === "notifications" && (
            <NotificationsSettings
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {activeSettingsSection === "webhooks" && (
            <WebhooksSettings setHasUnsavedChanges={setHasUnsavedChanges} />
          )}

          {activeSettingsSection === "custom-domains" && (
            <CustomDomainsSettings
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
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
