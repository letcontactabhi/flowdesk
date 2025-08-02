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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Plus, ArrowRight, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

// MVP: Single Gmail-trained agent
const gmailAgent = {
  id: "default",
  name: "Gmail Support Agent",
  description: "AI agent trained on your Gmail support conversations",
  lastActive: "Active now", 
  status: "active",
}

export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen={false}>
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
                  <BreadcrumbLink href="#">flowdesk</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Welcome and Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Welcome to flowdesk</CardTitle>
                <CardDescription>
                  Your AI-powered customer support dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by creating your first AI agent or exploring analytics.
                </p>
                <div className="flex gap-2">
                  <Link href="/agents/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Agent
                    </Button>
                  </Link>
                  <Link href="/analytics">
                    <Button variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Gmail Agent</span>
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Conversations</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="text-sm font-medium">2.3s</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gmail Agent Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your AI Agent</h2>
              <Link href="/agents">
                <Button variant="ghost" size="sm">
                  Manage Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {/* MVP: Simple Gmail agent card - no complex detail page */}
              <Card className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
                        {gmailAgent.status}
                      </div>
                    </div>
                    <CardTitle className="text-base">{gmailAgent.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {gmailAgent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{gmailAgent.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>
              
              {/* Gmail Setup Card */}
              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center mb-2">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base text-center">Connect Gmail</CardTitle>
                  <CardDescription className="text-sm text-center">
                    Import your support emails to train the AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <Button size="sm">Connect Gmail Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
