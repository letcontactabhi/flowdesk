"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Circle } from "lucide-react"
import { useState } from "react"

// Import agent components
import { AgentPlayground } from "@/components/agents/details/agent-playground"
import { AgentActivity } from "@/components/agents/details/agent-activity"
import { AgentAnalytics } from "@/components/agents/details/agent-analytics"
import { AgentSources } from "@/components/agents/details/agent-sources"
import { AgentActions } from "@/components/agents/details/agent-actions"
import { AgentSettings } from "@/components/agents/details/agent-settings"

// Mock agent data
const agent = {
  id: "1",
  agentId: "wycXe-CuvZZ381lg83_9",
  name: "Customer Support Agent",
  description: "Handles general customer inquiries and support tickets",
  status: "active" as const,
  sources: ["Gmail", "Intercom", "Knowledge Base"],
  conversations: 245,
  responseRate: "98%",
  fallbackRate: "5%",
  avgResponseTime: "2.3s",
  lastActive: "2 hours ago",
  size: "7 KB",
  creditLimit: true,
}

export default function AgentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">flowdesk</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/agents">agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{agent.name.toLowerCase()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 p-4">
          <Tabs defaultValue="playground" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="playground" className="flex-none">
                Playground
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-none">
                Activity
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-none">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex-none">
                Sources
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex-none">
                Actions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-none">
                <span className="flex items-center gap-1">
                  Settings
                  {hasUnsavedChanges && (
                    <Circle className="h-1 w-1 fill-orange-500 text-orange-500" />
                  )}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground" className="mt-6">
              <AgentPlayground agent={agent} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <AgentActivity agent={agent} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <AgentAnalytics agent={agent} />
            </TabsContent>

            <TabsContent value="sources" className="mt-6">
              <AgentSources agent={agent} />
            </TabsContent>

            <TabsContent value="actions" className="mt-6">
              <AgentActions agent={agent} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <AgentSettings
                agent={agent}
                hasUnsavedChanges={hasUnsavedChanges}
                setHasUnsavedChanges={setHasUnsavedChanges}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
