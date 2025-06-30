import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Bot,
  Play,
  Activity,
  BarChart3,
  Database,
  Zap,
  Users,
  Link2,
  Settings,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { AgentPlayground } from "@/components/agents/agent-playground"
import { AgentActivity } from "@/components/agents/agent-activity"
import { AgentSources } from "@/components/agents/agent-sources"
import { AgentActions } from "@/components/agents/agent-actions"
import { AgentContacts } from "@/components/agents/agent-contacts"
import { AgentConnect } from "@/components/agents/agent-connect"
import { AgentSettings } from "@/components/agents/agent-settings"

// Mock agent data
const agent = {
  id: "1",
  name: "Customer Support Agent",
  description: "Handles general customer inquiries and support tickets",
  status: "active",
  sources: ["Gmail", "Intercom", "Knowledge Base"],
  conversations: 245,
  responseRate: "98%",
  fallbackRate: "5%",
  avgResponseTime: "2.3s",
  lastActive: "2 hours ago",
}

export default function AgentDetailPage({
  params,
}: {
  params: { id: string }
}) {
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
                  <BreadcrumbLink href="/agents">AI Agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{agent.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-4">
            <Link href="/agents">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Bot className="text-primary h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">{agent.name}</h1>
                <p className="text-muted-foreground">{agent.description}</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  agent.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                }`}
              >
                {agent.status}
              </div>
            </div>
          </div>

          <Tabs defaultValue="playground" className="space-y-4">
            <TabsList className="grid w-full max-w-4xl grid-cols-7">
              <TabsTrigger
                value="playground"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">Playground</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Sources</span>
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="connect" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Connect</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground">
              <AgentPlayground agent={agent} />
            </TabsContent>

            <TabsContent value="activity">
              <AgentActivity agent={agent} />
            </TabsContent>

            <TabsContent value="sources">
              <AgentSources agent={agent} />
            </TabsContent>

            <TabsContent value="actions">
              <AgentActions agent={agent} />
            </TabsContent>

            <TabsContent value="contacts">
              <AgentContacts agent={agent} />
            </TabsContent>

            <TabsContent value="connect">
              <AgentConnect agent={agent} />
            </TabsContent>

            <TabsContent value="settings">
              <AgentSettings agent={agent} />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
