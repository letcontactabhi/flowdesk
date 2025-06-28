"use client"

import * as React from "react"
import {
  Bot,
  MessageSquare,
  Search,
  LayoutDashboard,
  BookOpen,
  Settings,
  BarChart3,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  headerNav: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Integrations",
      url: "#",
      icon: Zap,
    },
  ],
  mainNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Live Chats",
      url: "#",
      icon: MessageSquare,
    },
    {
      title: "AI Agents",
      url: "#",
      icon: Bot,
    },
    {
      title: "Knowledge Base",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.headerNav} />
        <NavMain items={data.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
