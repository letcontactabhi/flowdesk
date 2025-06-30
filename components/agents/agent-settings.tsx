"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Bot,
  MessageSquare,
  Shield,
  Trash2,
  Save,
} from "lucide-react"

interface AgentSettingsProps {
  agent: {
    id: string
    name: string
    description: string
    status: string
  }
}

export function AgentSettings({ agent }: AgentSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Agent Settings</h3>
          <p className="text-muted-foreground">
            Configure your AI agent's behavior and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Behavior</span>
          </TabsTrigger>
          <TabsTrigger value="responses" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Responses</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your agent's basic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input id="agent-name" defaultValue={agent.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-status">Status</Label>
                  <select
                    id="agent-status"
                    className="border-input bg-background w-full rounded-md border px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="training">Training</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-description">Description</Label>
                <Textarea
                  id="agent-description"
                  defaultValue={agent.description}
                  placeholder="Describe what this agent helps with..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-greeting">Welcome Message</Label>
                <Textarea
                  id="agent-greeting"
                  defaultValue="Hello! I'm here to help you with any questions you might have."
                  placeholder="Enter the greeting message users will see..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Personality</CardTitle>
              <CardDescription>
                Configure how your agent communicates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Communication Tone</Label>
                <select
                  id="tone"
                  className="border-input bg-background w-full rounded-md border px-3 py-2"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="empathetic">Empathetic</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <select
                  id="language"
                  className="border-input bg-background w-full rounded-md border px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-length">Response Length</Label>
                <select
                  id="response-length"
                  className="border-input bg-background w-full rounded-md border px-3 py-2"
                >
                  <option value="concise">Concise</option>
                  <option value="balanced">Balanced</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Behavior Settings</CardTitle>
              <CardDescription>
                Configure how your agent handles different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-escalate to human</Label>
                    <p className="text-muted-foreground text-sm">
                      Automatically transfer to human when confidence is low
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confidence-threshold">
                    Confidence Threshold (%)
                  </Label>
                  <Input
                    id="confidence-threshold"
                    type="number"
                    defaultValue="75"
                    min="0"
                    max="100"
                  />
                  <p className="text-muted-foreground text-xs">
                    Responses below this confidence level will trigger
                    escalation
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable learning from conversations</Label>
                    <p className="text-muted-foreground text-sm">
                      Allow the agent to improve from user interactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suggest human handoff</Label>
                    <p className="text-muted-foreground text-sm">
                      Offer users the option to speak with a human
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Collect user feedback</Label>
                    <p className="text-muted-foreground text-sm">
                      Ask users to rate responses for improvement
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Guidelines</CardTitle>
              <CardDescription>
                Set rules for how your agent should respond
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prohibited-topics">Prohibited Topics</Label>
                <Textarea
                  id="prohibited-topics"
                  placeholder="Enter topics the agent should avoid discussing..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-instructions">Custom Instructions</Label>
                <Textarea
                  id="custom-instructions"
                  placeholder="Additional instructions for the agent's behavior..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fallback Responses</CardTitle>
              <CardDescription>
                Messages shown when the agent can't help
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fallback-message">
                  Default Fallback Message
                </Label>
                <Textarea
                  id="fallback-message"
                  defaultValue="I'm sorry, I don't have information about that topic. Would you like me to connect you with a human agent?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="escalation-message">Escalation Message</Label>
                <Textarea
                  id="escalation-message"
                  defaultValue="Let me connect you with one of our human representatives who can better assist you."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="offline-message">Offline Message</Label>
                <Textarea
                  id="offline-message"
                  defaultValue="Our support team is currently offline. Please leave your message and we'll get back to you soon!"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Formatting</CardTitle>
              <CardDescription>
                Control how responses are formatted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include source citations</Label>
                  <p className="text-muted-foreground text-sm">
                    Show which documents the answer came from
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable markdown formatting</Label>
                  <p className="text-muted-foreground text-sm">
                    Allow bold, italic, and links in responses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show typing indicators</Label>
                  <p className="text-muted-foreground text-sm">
                    Display "AI is typing..." while generating response
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Manage who can access this agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allowed-domains">Allowed Domains</Label>
                <Input
                  id="allowed-domains"
                  placeholder="example.com, app.example.com (leave empty for all domains)"
                />
                <p className="text-muted-foreground text-xs">
                  Restrict widget usage to specific domains
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require authentication</Label>
                  <p className="text-muted-foreground text-sm">
                    Only allow authenticated users to chat
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate limiting</Label>
                  <p className="text-muted-foreground text-sm">
                    Limit the number of messages per user
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>
                Configure data handling and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Store conversation history</Label>
                  <p className="text-muted-foreground text-sm">
                    Keep records of user conversations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Collect user analytics</Label>
                  <p className="text-muted-foreground text-sm">
                    Track usage patterns and performance metrics
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention (days)</Label>
                <Input
                  id="data-retention"
                  type="number"
                  defaultValue="90"
                  min="1"
                  max="365"
                />
                <p className="text-muted-foreground text-xs">
                  How long to keep conversation data
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Delete Agent</h4>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete this agent and all its data
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
