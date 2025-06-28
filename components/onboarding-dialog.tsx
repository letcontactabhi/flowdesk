"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Building2,
  Users,
  Mail,
  CheckCircle,
  ArrowRight,
  Crown,
  Shield,
  User,
} from "lucide-react"
import { organization } from "@/lib/auth-client"
import { toast } from "sonner"

interface OnboardingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

export function OnboardingDialog({
  open,
  onOpenChange,
  onComplete,
}: OnboardingDialogProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Workspace setup
  const [workspaceName, setWorkspaceName] = useState("")
  const [workspaceSlug, setWorkspaceSlug] = useState("")

  // Team member invites
  const [inviteEmails, setInviteEmails] = useState<string[]>([""])

  const handleTeamSetup = async () => {
    if (!workspaceName.trim() || !workspaceSlug.trim()) {
      toast.error("Please fill in all team details")
      return
    }

    setLoading(true)
    try {
      await organization.create({
        name: workspaceName.trim(),
        slug: workspaceSlug.trim(),
      })

      toast.success("Team created successfully!")
      setStep(2)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create team"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleInviteTeam = async () => {
    const validEmails = inviteEmails.filter(
      (email) => email.trim() && email.includes("@")
    )

    if (validEmails.length === 0) {
      // Skip if no emails provided
      setStep(3)
      return
    }

    setLoading(true)
    try {
      const invitePromises = validEmails.map((email) =>
        organization.inviteMember({
          email: email.trim(),
          role: "member" as const,
        })
      )

      await Promise.all(invitePromises)
      toast.success(
        `Sent ${validEmails.length} invitation${validEmails.length > 1 ? "s" : ""}!`
      )
      setStep(3)
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send invitations"
      )
    } finally {
      setLoading(false)
    }
  }

  const addEmailField = () => {
    setInviteEmails([...inviteEmails, ""])
  }

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...inviteEmails]
    newEmails[index] = value
    setInviteEmails(newEmails)
  }

  const removeEmail = (index: number) => {
    if (inviteEmails.length > 1) {
      const newEmails = inviteEmails.filter((_, i) => i !== index)
      setInviteEmails(newEmails)
    }
  }

  const handleComplete = () => {
    onComplete()
    onOpenChange(false)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Welcome to Flowdesk
          </DialogTitle>
          <DialogDescription>
            Let's set up your team and get you started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } `}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <ArrowRight
                    className={`mx-2 h-4 w-4 ${
                      step > stepNumber
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Team Setup */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Create Your Team
                </CardTitle>
                <CardDescription>
                  Your team is where you'll collaborate and manage customer
                  support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Team Name</Label>
                  <Input
                    id="workspace-name"
                    placeholder="Support Team"
                    value={workspaceName}
                    onChange={(e) => {
                      setWorkspaceName(e.target.value)
                      setWorkspaceSlug(generateSlug(e.target.value))
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-slug">Team URL</Label>
                  <Input
                    id="workspace-slug"
                    placeholder="support-team"
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value)}
                  />
                  <p className="text-muted-foreground text-xs">
                    This will be used in URLs and must be unique
                  </p>
                </div>
                <Button
                  onClick={handleTeamSetup}
                  disabled={
                    loading || !workspaceName.trim() || !workspaceSlug.trim()
                  }
                  className="w-full"
                >
                  {loading ? "Creating..." : "Create Team"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Invite Team */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invite Your Team
                </CardTitle>
                <CardDescription>
                  Invite team members to collaborate (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inviteEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="colleague@example.com"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                      />
                    </div>
                    {inviteEmails.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmail(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addEmailField}
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Add Another Email
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="flex-1"
                  >
                    Skip for Now
                  </Button>
                  <Button
                    onClick={handleInviteTeam}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? "Sending..." : "Send Invitations"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  All Set!
                </CardTitle>
                <CardDescription>Your workspace is ready to go</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Team created
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    You're the team owner
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Ready to start collaborating
                  </div>
                </div>

                <div className="bg-muted/50 space-y-2 rounded-lg p-4">
                  <h4 className="text-sm font-medium">Your Role</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      <Crown className="mr-1 h-3 w-3" />
                      Owner
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      Full access to all team features
                    </span>
                  </div>
                </div>

                <Button onClick={handleComplete} className="w-full">
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
