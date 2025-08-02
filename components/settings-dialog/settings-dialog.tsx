"use client"

import * as React from "react"
import {
  Bell,
  Check,
  CreditCard,
  Home,
  Link,
  Lock,
  Settings,
  Users,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { GeneralPage } from "./general"
import { AccountPage } from "./account"
import { BillingPage } from "./billing"
import { IntegrationsPage } from "./integrations"
import { NotificationsPage } from "./notifications"
import { SecurityPage } from "./security"
// MVP: Members page removed
import { PlansPage } from "./plans"

const data = {
  nav: [
    { name: "General", icon: Settings },
    { name: "Account", icon: Home },
    // MVP: Members removed
    { name: "Billing", icon: Check },
    { name: "Plans", icon: CreditCard },
    { name: "Integrations", icon: Link },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Lock },
  ],
}

export function SettingsDialog({
  open,
  onOpenChange,
  initialTab = "General",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTab?: string
}) {
  const [activeTab, setActiveTab] = React.useState(initialTab)

  // Update active tab when initialTab changes
  React.useEffect(() => {
    if (open) {
      setActiveTab(initialTab)
    }
  }, [open, initialTab])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] overflow-hidden p-0 md:max-w-[800px] lg:max-w-5xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activeTab}
                          onClick={() => setActiveTab(item.name)}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-full flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeTab}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {activeTab === "General" && <GeneralPage />}
              {activeTab === "Account" && <AccountPage />}
              {/* MVP: Members page removed */}
              {activeTab === "Billing" && <BillingPage />}
              {activeTab === "Plans" && <PlansPage />}
              {activeTab === "Integrations" && <IntegrationsPage />}
              {activeTab === "Notifications" && <NotificationsPage />}
              {activeTab === "Security" && <SecurityPage />}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
