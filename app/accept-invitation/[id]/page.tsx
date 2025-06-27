"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AuthForm } from "@/components/auth/auth-form"
import { organization } from "@/lib/auth-client"
import { Building2, Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AcceptInvitationPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)
  const [invitation, setInvitation] = useState<any>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const result = await organization.getInvitation({
          invitationId: params.id,
        })

        if (result.data) {
          setInvitation(result.data)
        } else {
          setError("Invitation not found or has expired")
        }
      } catch (err: any) {
        setError(err.message || "Failed to load invitation")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvitation()
  }, [params.id])

  const handleAcceptInvitation = async () => {
    setIsAccepting(true)
    try {
      await organization.acceptInvitation({
        invitationId: params.id,
      })

      toast.success("Successfully joined the organization!")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message || "Failed to accept invitation")
    } finally {
      setIsAccepting(false)
    }
  }

  const handleDeclineInvitation = async () => {
    try {
      // For now, just redirect back - you might want to implement a decline endpoint
      router.push("/signin")
    } catch (err: any) {
      toast.error(err.message || "Failed to decline invitation")
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-md">
          <AuthForm
            title="Loading invitation..."
            description="Please wait while we verify your invitation"
          >
            <div className="flex justify-center py-8">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
            </div>
          </AuthForm>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-md">
          <AuthForm
            title="Invalid Invitation"
            description="This invitation link is invalid or has expired"
            error={error}
          >
            <div className="space-y-4">
              <div className="flex justify-center py-4">
                <X className="h-12 w-12 text-red-500" />
              </div>
              <Button onClick={() => router.push("/signin")} className="w-full">
                Go to Sign In
              </Button>
            </div>
          </AuthForm>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <Building2 className="text-primary h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-xl">You're Invited!</CardTitle>
            <CardDescription>
              You've been invited to join{" "}
              <strong>{invitation.organization.name}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground text-sm">
                <strong>
                  {invitation.inviter.user.name ||
                    invitation.inviter.user.email}
                </strong>{" "}
                invited you to join their organization as a{" "}
                <strong className="capitalize">{invitation.role}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAcceptInvitation}
                disabled={isAccepting}
                className="w-full"
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Accept Invitation
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleDeclineInvitation}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-xs">
                By accepting, you'll be able to collaborate with the team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
