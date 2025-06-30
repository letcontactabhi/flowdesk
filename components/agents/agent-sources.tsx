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
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Database,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  Trash2,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"

interface AgentSourcesProps {
  agent: {
    id: string
    name: string
    sources: string[]
  }
}

// Mock sources data
const connectedSources = [
  {
    id: "1",
    type: "gmail",
    name: "Gmail Integration",
    description: "Connected to support@company.com",
    logo: "/integration-logo/gmail.svg",
    status: "active",
    documentsCount: 1250,
    lastSync: "2 hours ago",
    syncStatus: "success",
  },
  {
    id: "2",
    type: "intercom",
    name: "Intercom",
    description: "Customer conversations and knowledge base",
    logo: "/integration-logo/Intercom.svg",
    status: "active",
    documentsCount: 890,
    lastSync: "30 minutes ago",
    syncStatus: "success",
  },
  {
    id: "3",
    type: "files",
    name: "Uploaded Files",
    description: "PDF documents and manuals",
    icon: FileText,
    status: "active",
    documentsCount: 45,
    lastSync: "1 day ago",
    syncStatus: "success",
  },
]

const availableSources = [
  {
    type: "zendesk",
    name: "Zendesk",
    description: "Import tickets and articles",
    logo: "/integration-logo/Zendesk.svg",
  },
  {
    type: "website",
    name: "Website Crawler",
    description: "Crawl your website content",
    icon: Globe,
  },
  {
    type: "notion",
    name: "Notion",
    description: "Connect Notion pages",
    icon: FileText,
  },
]

export function AgentSources({ agent }: AgentSourcesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Connected Sources</h3>
          <p className="text-muted-foreground">
            Data sources currently training your AI agent
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Source
        </Button>
      </div>

      <div className="grid gap-4">
        {connectedSources.map((source) => (
          <Card key={source.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
                  {source.logo ? (
                    <Image
                      src={source.logo}
                      alt={source.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    source.icon && (
                      <source.icon className="text-muted-foreground h-8 w-8" />
                    )
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="font-medium">{source.name}</h4>
                    <Badge
                      variant={
                        source.status === "active" ? "default" : "secondary"
                      }
                    >
                      {source.status}
                    </Badge>
                    <Badge
                      variant={
                        source.syncStatus === "success"
                          ? "default"
                          : "destructive"
                      }
                      className="ml-2"
                    >
                      {source.syncStatus === "success" ? "Synced" : "Error"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2 text-sm">
                    {source.description}
                  </p>
                  <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Database className="h-4 w-4" />
                      <span>
                        {source.documentsCount.toLocaleString()} documents
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RefreshCw className="h-4 w-4" />
                      <span>Last sync: {source.lastSync}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Available Sources</h3>
          <p className="text-muted-foreground">
            Add more data sources to improve your agent
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableSources.map((source) => (
            <Card
              key={source.type}
              className="hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  {source.logo ? (
                    <div className="flex h-10 w-10 items-center justify-center">
                      <Image
                        src={source.logo}
                        alt={source.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                  ) : (
                    source.icon && (
                      <source.icon className="text-muted-foreground h-8 w-8" />
                    )
                  )}
                  <div>
                    <h4 className="font-medium">{source.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {source.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Status</CardTitle>
          <CardDescription>
            Current status of your agent's knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">2,185</div>
              <div className="text-muted-foreground text-sm">
                Total Documents
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="text-muted-foreground text-sm">
                Training Status
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2 hours ago</div>
              <div className="text-muted-foreground text-sm">Last Updated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
