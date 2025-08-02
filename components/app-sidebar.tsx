"use client"

import * as React from "react"
import {
  Bot,
  LayoutDashboard,
  BarChart3,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
// MVP: Simplified navigation - removed team switcher and secondary nav

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

// MVP: Logo component that adapts to sidebar state
function SidebarLogo() {
  const { state } = useSidebar()
  
  if (state === "collapsed") {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Zap className="h-4 w-4 text-primary-foreground" />
      </div>
      <h2 className="text-lg font-semibold">flowdesk</h2>
    </div>
  )
}

// MVP: Simplified navigation for Gmail-focused product
const data = {
  mainNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Gmail Agent",
      url: "/agents",
      icon: Bot,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        {/* MVP: Logo that adapts to sidebar state */}
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
