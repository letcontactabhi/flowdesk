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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  ChevronDown,
  User,
  Brain,
  MessageSquare,
  Shield,
  Bell,
  Webhook,
  Globe,
} from "lucide-react"
import Link from "next/link"

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
                  <BreadcrumbLink href="/agents">agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{agent.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <p className="text-muted-foreground">
            Manage your agent's configuration, monitor performance, and test
            interactions in real-time.
          </p>

          <Card className="flex h-full flex-col shadow-none">
            <CardHeader></CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="playground" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-6">
                  <TabsTrigger value="playground" className="text-sm">
                    Playground
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="text-sm">
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="text-sm">
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="sources" className="text-sm">
                    Sources
                  </TabsTrigger>
                  <TabsTrigger value="actions" className="text-sm">
                    Actions
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-sm">
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="playground" className="mt-4">
                  {/* Playground content */}
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  {/* Activity content */}
                </TabsContent>

                <TabsContent value="analytics" className="mt-4">
                  {/* Analytics content */}
                </TabsContent>

                <TabsContent value="sources" className="mt-4">
                  {/* Sources content */}
                </TabsContent>

                <TabsContent value="actions" className="mt-4">
                  {/* Actions content */}
                </TabsContent>

                <TabsContent value="settings" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4" />
                          <span className="font-medium">General</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Configure basic agent settings, name, and description.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Brain className="h-4 w-4" />
                          <span className="font-medium">AI</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Configure AI model, training data, and behavior
                          parameters.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">Chat Interface</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Customize chat appearance, branding, and user
                          interface options.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Shield className="h-4 w-4" />
                          <span className="font-medium">Security</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Manage access controls, API keys, and security
                          policies.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4" />
                          <span className="font-medium">Notifications</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Configure email alerts, escalation rules, and
                          notification preferences.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Webhook className="h-4 w-4" />
                          <span className="font-medium">Webhooks</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Set up webhook endpoints for external integrations and
                          events.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4" />
                          <span className="font-medium">Custom Domains</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground text-sm">
                          Configure custom domains and white-label chat widget
                          embedding.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
