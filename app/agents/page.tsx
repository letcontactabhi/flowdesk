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

// MVP: Single default agent trained on Gmail data
const defaultAgent = {
  id: "default",
  name: "Gmail Support Agent", 
  description: "AI agent trained on your Gmail support conversations",
  lastActive: "Active now",
  status: "active",
}

export default function AIAgentsPage() {
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
              Your AI agent trained on Gmail support conversations
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* MVP: Simple Gmail agent card - no complex detail page */}
            <Card className="hover:bg-muted/50 h-32 w-full shadow-none border-2">
                <CardHeader className="px-4 pt-4 pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <Bot className="text-primary h-6 w-6" />
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
                      {defaultAgent.status}
                    </div>
                  </div>
                  <CardTitle className="truncate text-base leading-tight">
                    {defaultAgent.name}
                  </CardTitle>
                  <CardDescription className="truncate text-sm leading-tight">
                    {defaultAgent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pt-0 pb-4">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span className="truncate">
                      {defaultAgent.lastActive}
                    </span>
                  </div>
                </CardContent>
              </Card>
          </div>

          {/* MVP: Gmail setup card */}
          <Card className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed">
            <Bot className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Connect Gmail to get started</h3>
            <p className="text-muted-foreground mb-4">
              Connect your Gmail account to train your AI agent on past support conversations
            </p>
            <Button>
              Connect Gmail Account
            </Button>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
