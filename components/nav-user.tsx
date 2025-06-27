"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  Check,
  ChevronsUpDown,
  LogOut,
  Plus,
  Settings,
  UserPlus,
  Monitor,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SettingsDialog } from "@/components/settings-dialog"
import { authClient, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export function NavUser() {
  const { data: session, isPending, error } = useSession()
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [showSettings, setShowSettings] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleSettingsClick = () => {
    setShowSettings(true)
    setDropdownOpen(false) // Close dropdown when opening settings
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setDropdownOpen(false) // Close dropdown immediately

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out")
            router.push("/signin")
            router.refresh()
          },
          onError: (ctx) => {
            console.error("Logout error:", ctx.error)
            toast.error("Failed to log out. Please try again.")
            setIsLoggingOut(false)
          },
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out. Please try again.")
      setIsLoggingOut(false)
    }
  }

  // Show loading skeleton while session is loading
  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <ChevronsUpDown className="ml-auto size-4 opacity-50" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // Handle error or no session
  if (error || !session?.user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-muted-foreground truncate font-medium">
                {error ? "Error loading user" : "Not signed in"}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const user = session.user
  const displayName = user.name || user.email?.split("@")[0] || "User"
  const userInitials = displayName.charAt(0).toUpperCase()

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                disabled={isLoggingOut}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image || ""} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="start"
              sideOffset={4}
            >
              {/* User Info Header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-3 py-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image || ""} alt={displayName} />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-medium">
                      {displayName}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      Free Plan • 1 member
                      {user.emailVerified && (
                        <span className="ml-2 inline-flex items-center">
                          <BadgeCheck className="h-3 w-3 text-green-600" />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              {/* Action Buttons */}
              <div className="flex gap-1 px-3 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 flex-1 text-xs"
                  onClick={handleSettingsClick}
                  disabled={isLoggingOut}
                >
                  <Settings className="mr-1 h-3 w-3" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 flex-1 text-xs"
                  disabled={isLoggingOut}
                >
                  <UserPlus className="mr-1 h-3 w-3" />
                  Invite
                </Button>
              </div>

              <DropdownMenuSeparator />

              {/* Current User (with check) */}
              <DropdownMenuItem className="px-3 py-1.5">
                <Avatar className="mr-2 h-5 w-5 rounded">
                  <AvatarImage src={user.image || ""} alt={displayName} />
                  <AvatarFallback className="rounded text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm">{displayName}</span>
                <Check className="h-3 w-3 text-green-600" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Workspace Actions */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  disabled={isLoggingOut}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  New workspace
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  disabled={isLoggingOut}
                >
                  Create work account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  disabled={isLoggingOut}
                >
                  Add another account
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Bottom Actions */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950 dark:focus:text-red-400"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-3 w-3" />
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  disabled={isLoggingOut}
                >
                  <Monitor className="mr-2 h-3 w-3" />
                  Get Mac app
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </>
  )
}
