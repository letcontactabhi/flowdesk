"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Users, Building2, Check } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CreateTeamPopover } from "@/components/create-team-popover"
import {
  useActiveOrganization,
  useListOrganizations,
  organization,
} from "@/lib/auth-client"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export function TeamSwitcher() {
  const { data: activeOrganization } = useActiveOrganization()
  const { data: organizations } = useListOrganizations()
  const { isMobile } = useSidebar()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [isCreatingTeam, setIsCreatingTeam] = React.useState(false)

  const handleTeamCreated = () => {
    setIsCreatingTeam(false)
    setDropdownOpen(false)
    // Refresh the page to show the new team
    window.location.reload()
  }

  const handleSwitchOrganization = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId })
      toast.success("Workspace switched successfully!")
      setDropdownOpen(false)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to switch workspace"
      )
    }
  }

  // Show loading skeleton while data is loading
  if (!organizations) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <ChevronsUpDown className="ml-auto opacity-50" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const displayName = activeOrganization?.name || "No team selected"
  const memberCount = activeOrganization
    ? (activeOrganization as any).memberCount || 1
    : 0

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={(open) => {
            // Don't close dropdown if we're creating a team
            if (!open && isCreatingTeam) {
              return
            }
            setDropdownOpen(open)
          }}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {memberCount > 0
                    ? `${memberCount} member${memberCount !== 1 ? "s" : ""}`
                    : "No members"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>

            {/* Current active team */}
            {activeOrganization && (
              <DropdownMenuItem className="gap-2 p-2">
                <div className="bg-sidebar-primary/10 flex size-6 items-center justify-center rounded-md border">
                  <Building2 className="text-sidebar-primary size-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activeOrganization.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {memberCount} member{memberCount !== 1 ? "s" : ""}
                  </div>
                </div>
                <Check className="size-3 text-green-600" />
              </DropdownMenuItem>
            )}

            {/* Other teams */}
            {organizations && organizations.length > 1 && (
              <>
                <DropdownMenuSeparator />
                {organizations
                  .filter((org) => org.id !== activeOrganization?.id)
                  .map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={() => handleSwitchOrganization(org.id)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border">
                        <Users className="size-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{org.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {(org as any).memberCount || 1} member
                          {((org as any).memberCount || 1) !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
              </>
            )}

            <DropdownMenuSeparator />

            {/* Create team option */}
            <CreateTeamPopover
              open={isCreatingTeam}
              onOpenChange={setIsCreatingTeam}
              onTeamCreated={handleTeamCreated}
            >
              <DropdownMenuItem
                className="gap-2 p-2"
                onSelect={(e) => {
                  e.preventDefault()
                  setIsCreatingTeam(true)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCreatingTeam(true)
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Create team
                </div>
              </DropdownMenuItem>
            </CreateTeamPopover>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
