"use client"

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

interface ChatInterfaceSettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function ChatInterfaceSettings({
  setHasUnsavedChanges,
}: ChatInterfaceSettingsProps) {
  return (
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
            <Label htmlFor="sound-notifications">Sound Notifications</Label>
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
  )
}
