"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BadgeCheck,
  LogOut,
  Settings,
  Monitor,
  User,
  Plus,
  Sun,
  Moon,
  Laptop,
  Home,
  CreditCard,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SettingsDialog } from "@/components/settings-dialog"
import { CreateTeamDialog, useCreateTeamDialog } from "./create-team-popover"
import { authClient, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export function NavUser() {
  const { data: session, isPending, error } = useSession()
  const { isMobile } = useSidebar()
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  const [showSettings, setShowSettings] = React.useState(false)
  const [settingsTab, setSettingsTab] = React.useState("General")
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const createTeamDialog = useCreateTeamDialog()

  const handleSettingsClick = () => {
    setSettingsTab("General")
    setShowSettings(true)
    setDropdownOpen(false) // Close dropdown when opening settings
  }

  const handleAccountClick = () => {
    setSettingsTab("Account")
    setShowSettings(true)
    setDropdownOpen(false) // Close dropdown when opening settings
  }

  const handleBillingClick = () => {
    setSettingsTab("Billing")
    setShowSettings(true)
    setDropdownOpen(false) // Close dropdown when opening settings
  }

  const handleCreateTeamClick = () => {
    setDropdownOpen(false) // Close dropdown first
    createTeamDialog.openDialog() // Then open the dialog
  }

  const handleTeamCreated = () => {
    // Refresh to show the new team
    window.location.reload()
  }

  const handleThemeChange = (newTheme: string) => {
    if (newTheme) {
      setTheme(newTheme)
    }
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
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg"
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
                      {user.email}
                      {user.emailVerified && (
                        <span className="ml-2 inline-flex items-center">
                          <BadgeCheck className="h-3 w-3 text-green-600" />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* User Actions */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  onClick={handleSettingsClick}
                  disabled={isLoggingOut}
                >
                  <Settings className="mr-2 h-3 w-3" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  onClick={handleAccountClick}
                  disabled={isLoggingOut}
                >
                  <Home className="mr-2 h-3 w-3" />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  onClick={handleBillingClick}
                  disabled={isLoggingOut}
                >
                  <CreditCard className="mr-2 h-3 w-3" />
                  Billing
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm"
                  disabled={isLoggingOut}
                  onClick={handleCreateTeamClick}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Create Team
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <div className="flex w-full flex-row items-center justify-between px-3 py-1">
                  <span className="text-sm">Theme</span>
                  <ToggleGroup
                    type="single"
                    value={theme || "system"}
                    onValueChange={handleThemeChange}
                    className="ml-auto"
                    size="sm"
                    variant="outline"
                  >
                    <ToggleGroupItem
                      value="light"
                      aria-label="Light theme"
                      className="h-6 w-8"
                    >
                      <Sun className="h-2.5 w-2.5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="dark"
                      aria-label="Dark theme"
                      className="h-6 w-8"
                    >
                      <Moon className="h-2.5 w-2.5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="system"
                      aria-label="System theme"
                      className="h-6 w-8"
                    >
                      <Laptop className="h-2.5 w-2.5" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="px-3 py-1.5 text-sm focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950 dark:focus:text-red-400"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-3 w-3" />
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        initialTab={settingsTab}
      />
      <CreateTeamDialog
        open={createTeamDialog.open}
        onOpenChange={createTeamDialog.setOpen}
        onSuccess={handleTeamCreated}
      />
    </>
  )
}
