"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Mail,
  Crown,
  User,
  Send,
  MoreHorizontal,
  Trash2,
  Copy,
  UserPlus,
} from "lucide-react"
import { toast } from "sonner"
import {
  useActiveOrganization,
  useListOrganizations,
  organization,
  useSession,
} from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MembersPage() {
  const { data: activeOrganization, isPending: isLoadingOrg } =
    useActiveOrganization()
  const { data: organizations, isPending: isLoadingOrgs } =
    useListOrganizations()
  const { data: session } = useSession()

  const [inviteOpen, setInviteOpen] = useState(false)
  const [isInviting, setIsInviting] = useState(false)
  const [members, setMembers] = useState<any[]>([])
  const [invitations, setInvitations] = useState<any[]>([])
  const [loadingMembers, setLoadingMembers] = useState(false)

  // Invite member form
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  // Memoize the effective organization to prevent unnecessary recalculations
  const effectiveOrganization = useMemo(() => {
    return (
      activeOrganization ||
      (organizations && organizations.length > 0 ? organizations[0] : null)
    )
  }, [activeOrganization, organizations])

  // Memoize just the organization ID to avoid object reference changes
  const effectiveOrgId = useMemo(() => {
    return effectiveOrganization?.id
  }, [effectiveOrganization?.id])

  // Memoize the loadMembersAndInvitations function with stable dependencies
  const loadMembersAndInvitations = useCallback(
    async (orgId?: string) => {
      const targetOrgId = orgId || effectiveOrgId
      if (!targetOrgId) return

      setLoadingMembers(true)
      try {
        // Get full organization with members and invitations
        const fullOrg = await organization.getFullOrganization({
          query: { organizationId: targetOrgId },
        })

        // Load invitations
        const invitationsResult = await organization.listInvitations({
          query: { organizationId: targetOrgId },
        })

        setMembers(fullOrg.data?.members || [])
        setInvitations(invitationsResult.data || [])
      } catch (error) {
        console.error("Failed to load members:", error)
      } finally {
        setLoadingMembers(false)
      }
    },
    [effectiveOrgId]
  )

  // Load members and invitations when effective organization ID changes
  useEffect(() => {
    if (effectiveOrgId) {
      loadMembersAndInvitations(effectiveOrgId)
    }
  }, [effectiveOrgId, loadMembersAndInvitations])

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim() || !effectiveOrganization) return

    setIsInviting(true)
    try {
      await organization.inviteMember({
        email: inviteEmail.trim(),
        role: inviteRole as "owner" | "member",
        organizationId: effectiveOrganization.id,
      })

      toast.success("Invitation sent successfully!")
      setInviteEmail("")
      setInviteOpen(false)

      // Reload invitations
      loadMembersAndInvitations(effectiveOrganization?.id)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send invitation"
      )
    } finally {
      setIsInviting(false)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    if (!effectiveOrganization) return

    try {
      await organization.removeMember({
        memberIdOrEmail: memberId,
        organizationId: effectiveOrganization.id,
      })
      toast.success("Member removed successfully!")
      loadMembersAndInvitations(effectiveOrganization?.id)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove member"
      )
    }
  }

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      await organization.cancelInvitation({
        invitationId,
      })
      toast.success("Invitation cancelled successfully!")
      loadMembersAndInvitations(effectiveOrgId)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel invitation"
      )
    }
  }

  const copyInviteLink = (invitationId: string) => {
    const inviteLink = `${window.location.origin}/accept-invitation/${invitationId}`
    navigator.clipboard.writeText(inviteLink)
    toast.success("Invite link copied to clipboard!")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4" />
      case "member":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner":
        return "default"
      case "member":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "owner":
        return "Owner"
      case "member":
        return "Member"
      default:
        return "Member"
    }
  }

  const canManageMembers = (userRole: string) => {
    return userRole === "owner"
  }

  const currentUserRole =
    members.find((m) => m.userId === session?.user?.id)?.role || "member"

  // Show loading state while organization is loading
  if (isLoadingOrg || isLoadingOrgs) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="bg-muted h-4 w-1/3 rounded"></div>
          <div className="bg-muted h-24 rounded"></div>
          <div className="bg-muted h-24 rounded"></div>
        </div>
      </div>
    )
  }

  // If no organizations exist, show create team message
  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-medium">No Teams Yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first team to start managing members.
        </p>
      </div>
    )
  }

  // If organizations exist but no effective one, show select team message
  if (!effectiveOrganization) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-medium">No Team Selected</h3>
        <p className="text-muted-foreground mb-4">
          Please select a team from the user menu to manage members.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-muted-foreground text-sm">
            Manage members for {effectiveOrganization.name}
          </p>
        </div>

        {canManageMembers(currentUserRole) && (
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join {effectiveOrganization.name}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInviteMember} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Member
                        </span>
                      </SelectItem>
                      {currentUserRole === "owner" && (
                        <SelectItem value="owner">
                          <span className="flex items-center gap-2">
                            <Crown className="h-4 w-4" />
                            Owner
                          </span>
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setInviteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isInviting}>
                    <Send className="mr-2 h-4 w-4" />
                    {isInviting ? "Sending..." : "Send Invitation"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members</CardTitle>
          <CardDescription>People who have access to this team</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingMembers ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-muted h-10 w-10 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="bg-muted h-4 w-32 rounded"></div>
                    <div className="bg-muted h-3 w-24 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="py-8 text-center">
              <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-medium">No members yet</h3>
              <p className="text-muted-foreground text-sm">
                Invite your first team member to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.user.image || ""} />
                          <AvatarFallback>
                            {(member.user.name || member.user.email)
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {member.user.name || "Unnamed User"}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {member.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(member.role)}>
                        <span className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {getRoleDisplayName(member.role)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {canManageMembers(currentUserRole) &&
                        member.userId !== session?.user?.id &&
                        member.role !== "owner" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRemoveMember(member.userId)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Invitations</CardTitle>
            <CardDescription>
              Invitations that haven't been accepted yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Invited</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell className="font-medium">
                      {invitation.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(invitation.role)}>
                        <span className="flex items-center gap-1">
                          {getRoleIcon(invitation.role)}
                          {getRoleDisplayName(invitation.role)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(
                        invitation.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyInviteLink(invitation.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {canManageMembers(currentUserRole) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleCancelInvitation(invitation.id)
                            }
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
