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

interface AISettingsProps {
  setHasUnsavedChanges: (value: boolean) => void
}

export function AISettings({ setHasUnsavedChanges }: AISettingsProps) {
  return (
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
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
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
  )
}
