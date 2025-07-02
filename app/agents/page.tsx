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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bot, Plus, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for agents
const agents = [
  {
    id: "1",
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Helps with product questions and sales inquiries",
    lastActive: "5 minutes ago",
    status: "active",
  },
  {
    id: "3",
    name: "Technical Support",
    description: "Assists with technical issues and troubleshooting",
    lastActive: "1 day ago",
    status: "inactive",
  },
]

export default function AIAgentsPage() {
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
                  <BreadcrumbPage>agents</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Create and manage agents to automate your customer support
            </p>
            <Link href="/agents/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New agent
              </Button>
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <Card className="hover:bg-muted/50 h-32 w-full cursor-pointer shadow-none transition-colors">
                  <CardHeader className="px-4 pt-4 pb-2">
                    <div className="mb-2 flex items-center justify-between">
                      <Bot className="text-primary h-6 w-6" />
                      <div
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          agent.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {agent.status}
                      </div>
                    </div>
                    <CardTitle className="truncate text-base leading-tight">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="truncate text-sm leading-tight">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pt-0 pb-4">
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span className="truncate">
                        Last active {agent.lastActive}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {agents.length === 0 && (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <Bot className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">No agents yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first AI agent to start automating customer support
              </p>
              <Link href="/agents/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first agent
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
