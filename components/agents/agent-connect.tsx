"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Copy,
  Code,
  Globe,
  Smartphone,
  Key,
  ExternalLink,
  Check,
} from "lucide-react"
import React, { useState } from "react"

interface AgentConnectProps {
  agent: {
    id: string
    name: string
  }
}

export function AgentConnect({ agent }: AgentConnectProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const apiKey = "sk_live_1234567890abcdef1234567890abcdef"
  const agentId = agent.id
  const widgetCode = `<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://widget.flowdesk.ai/widget.js';
    s.setAttribute('data-agent-id', '${agentId}');
    s.setAttribute('data-api-key', '${apiKey}');
    document.head.appendChild(s);
  })();
</script>`

  const reactCode = `import { FlowdeskWidget } from '@flowdesk/react-widget'

function App() {
  return (
    <div>
      {/* Your app content */}
      <FlowdeskWidget 
        agentId="${agentId}"
        apiKey="${apiKey}"
        position="bottom-right"
      />
    </div>
  )
}`

  const apiExampleCode = `curl -X POST https://api.flowdesk.ai/v1/chat \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "${agentId}",
    "message": "Hello, I need help with my account",
    "user_id": "user_123"
  }'`

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Connect Your Agent</h3>
        <p className="text-muted-foreground">
          Install your AI agent on your website or integrate via API
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <Key className="text-primary h-8 w-8" />
              <div>
                <h4 className="font-medium">API Key</h4>
                <p className="text-muted-foreground text-sm">
                  For programmatic access
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input value={apiKey} readOnly className="font-mono text-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(apiKey, "api-key")}
              >
                {copiedStates["api-key"] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <Globe className="text-primary h-8 w-8" />
              <div>
                <h4 className="font-medium">Agent ID</h4>
                <p className="text-muted-foreground text-sm">
                  Unique identifier
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input value={agentId} readOnly className="font-mono text-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(agentId, "agent-id")}
              >
                {copiedStates["agent-id"] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="widget" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="widget" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Website Widget</span>
          </TabsTrigger>
          <TabsTrigger value="react" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">React</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="widget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website Chat Widget
              </CardTitle>
              <CardDescription>
                Add this script to your website to embed the chat widget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Installation Code
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(widgetCode, "widget-code")}
                  >
                    {copiedStates["widget-code"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <pre className="overflow-x-auto text-sm">
                    <code>{widgetCode}</code>
                  </pre>
                </div>
                <p className="text-muted-foreground text-xs">
                  Add this code before the closing `&lt;/body&gt;` tag of your
                  website
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Test Widget
                </Button>
                <Button variant="outline">Customize Appearance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="react" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                React Integration
              </CardTitle>
              <CardDescription>
                Install the React component for seamless integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Installation</label>
                <div className="bg-muted rounded-md p-3">
                  <code className="text-sm">
                    npm install @flowdesk/react-widget
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Usage</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(reactCode, "react-code")}
                  >
                    {copiedStates["react-code"] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <pre className="overflow-x-auto text-sm">
                    <code>{reactCode}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                REST API Integration
              </CardTitle>
              <CardDescription>
                Build custom integrations using our REST API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base URL</label>
                <div className="bg-muted rounded-md p-3">
                  <code className="text-sm">https://api.flowdesk.ai/v1</code>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Example Request</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(apiExampleCode, "api-code")}
                  >
                    {copiedStates["api-code"] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <pre className="overflow-x-auto text-sm">
                    <code>{apiExampleCode}</code>
                  </pre>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
                <Button variant="outline">Generate SDK</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile SDKs
              </CardTitle>
              <CardDescription>
                Native mobile integrations for iOS and Android
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">iOS SDK</h4>
                  <div className="bg-muted rounded-md p-3">
                    <code className="text-sm">pod 'FlowdeskSDK'</code>
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    iOS Documentation
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Android SDK</h4>
                  <div className="bg-muted rounded-md p-3">
                    <code className="text-sm">
                      implementation 'com.flowdesk:sdk:1.0.0'
                    </code>
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Android Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>Current deployments and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-muted-foreground text-sm">
                Active Integrations
              </div>
              <div className="mt-2 flex justify-center gap-1">
                <Badge variant="secondary">Website</Badge>
                <Badge variant="secondary">API</Badge>
                <Badge variant="secondary">Mobile</Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1.2k</div>
              <div className="text-muted-foreground text-sm">
                API Calls Today
              </div>
              <div className="mt-1 text-xs text-green-600">
                ↑ 15% from yesterday
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
              <div className="mt-1 text-xs text-green-600">Last 30 days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
