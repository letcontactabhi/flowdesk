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
import Image from "next/image"

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
  ],
  mainNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: Bot,
    },
    {
      title: "Support Inbox",
      url: "#",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
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
