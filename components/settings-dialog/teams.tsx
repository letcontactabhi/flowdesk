"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
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
// import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Plus,
  Users,
  Mail,
  Crown,
  Shield,
  User,
  Building2,
  Send,
} from "lucide-react"
import { toast } from "sonner"
import {
  useListOrganizations,
  useActiveOrganization,
  organization,
} from "@/lib/auth-client"

export function TeamsPage() {
  const { data: organizations, isPending: organizationsLoading } =
    useListOrganizations()
  const { data: activeOrganization } = useActiveOrganization()

  const [createOrgOpen, setCreateOrgOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isInviting, setIsInviting] = useState(false)

  // Create organization form
  const [orgName, setOrgName] = useState("")
  const [orgSlug, setOrgSlug] = useState("")

  // Invite member form
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgName.trim() || !orgSlug.trim()) return

    setIsCreating(true)
    try {
      await organization.create({
        name: orgName.trim(),
        slug: orgSlug.trim(),
      })

      toast.success("Organization created successfully!")
      setOrgName("")
      setOrgSlug("")
      setCreateOrgOpen(false)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create organization"
      )
    } finally {
      setIsCreating(false)
    }
  }

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim() || !activeOrganization) return

    setIsInviting(true)
    try {
      await organization.inviteMember({
        email: inviteEmail.trim(),
        role: inviteRole as "admin" | "member",
        organizationId: activeOrganization.id,
      })

      toast.success("Invitation sent successfully!")
      setInviteEmail("")
      setInviteOpen(false)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send invitation"
      )
    } finally {
      setIsInviting(false)
    }
  }

  const handleSetActiveOrg = async (orgId: string) => {
    try {
      await organization.setActive({ organizationId: orgId })
      toast.success("Organization switched successfully!")
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to switch organization"
      )
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner":
        return "default"
      case "admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (organizationsLoading) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Teams & Organizations</h3>
          <p className="text-muted-foreground text-sm">
            Manage your organizations and invite team members
          </p>
        </div>

        <Dialog open={createOrgOpen} onOpenChange={setCreateOrgOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Create a new organization to collaborate with your team.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateOrganization} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  placeholder="My Company"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value)
                    // Auto-generate slug
                    setOrgSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-")
                        .replace(/-+/g, "-")
                        .replace(/^-|-$/g, "")
                    )
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-slug">Organization Slug</Label>
                <Input
                  id="org-slug"
                  placeholder="my-company"
                  value={orgSlug}
                  onChange={(e) => setOrgSlug(e.target.value)}
                  required
                />
                <p className="text-muted-foreground text-xs">
                  This will be used in URLs and must be unique
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateOrgOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Organization"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="organizations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="organizations">
            <Building2 className="mr-2 h-4 w-4" />
            Organizations
          </TabsTrigger>
          {activeOrganization && (
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              Team Members
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="organizations" className="space-y-4">
          {!organizations || organizations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">
                  No organizations yet
                </h3>
                <p className="text-muted-foreground mb-4 text-center text-sm">
                  Create your first organization to start collaborating with
                  your team.
                </p>
                <Button onClick={() => setCreateOrgOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Organization
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {organizations.map((org) => (
                <Card
                  key={org.id}
                  className={
                    activeOrganization?.id === org.id ? "border-primary" : ""
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Building2 className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {org.name}
                          </CardTitle>
                          <CardDescription>@{org.slug}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeOrganization?.id === org.id && (
                          <Badge variant="default">Active</Badge>
                        )}
                        <Badge variant={getRoleBadgeVariant((org as any).role)}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon((org as any).role)}
                            {(org as any).role}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {(org as any).memberCount || 1} member
                          {((org as any).memberCount || 1) !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {activeOrganization?.id !== org.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActiveOrg(org.id)}
                        >
                          Switch to this org
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {activeOrganization && (
          <TabsContent value="members" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium">Team Members</h4>
                <p className="text-muted-foreground text-sm">
                  Manage members for {activeOrganization.name}
                </p>
              </div>

              <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join {activeOrganization.name}
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
                          <SelectItem value="admin">
                            <span className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Admin
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-muted-foreground text-xs">
                        Members can view and collaborate. Admins can manage
                        members and settings.
                      </p>
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
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="py-8 text-center">
                  <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-medium">
                    Member management coming soon
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Full member list and management features will be available
                    in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
