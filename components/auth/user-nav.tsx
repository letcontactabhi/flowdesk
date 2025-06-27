"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  authClient,
  useSession,
  sendVerificationEmail,
} from "@/lib/auth-client"
// import Link from "next/link"

export function UserNav() {
  const { data: session, isPending } = useSession()
  const [loading, setLoading] = useState(false)
  const [verificationLoading, setVerificationLoading] = useState(false)

  if (isPending) {
    return (
      <Card className="max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <Loader2 size={16} className="mx-auto animate-spin" />
            <p className="text-muted-foreground mt-2 text-sm">Loading...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!session) {
    return null
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Account</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Manage your account settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Name</p>
            <p className="text-muted-foreground text-sm">
              {session.user.name || "Not provided"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Email</p>
            <p className="text-muted-foreground text-sm">
              {session.user.email}
            </p>
            <p className="text-muted-foreground text-xs">
              {session.user.emailVerified ? "✓ Verified" : "⚠ Not verified"}
            </p>
          </div>

          {!session.user.emailVerified && (
            <Button
              onClick={async () => {
                if (session?.user?.email) {
                  await sendVerificationEmail(
                    {
                      email: session.user.email,
                      callbackURL: "/dashboard",
                    },
                    {
                      onRequest: () => {
                        setVerificationLoading(true)
                      },
                      onResponse: () => {
                        setVerificationLoading(false)
                      },
                    }
                  )
                }
              }}
              disabled={verificationLoading}
              variant="outline"
              className="w-full"
            >
              {verificationLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Send verification email"
              )}
            </Button>
          )}

          <Button
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onRequest: () => {
                    setLoading(true)
                  },
                  onResponse: () => {
                    setLoading(false)
                  },
                },
              })
            }}
            disabled={loading}
            variant="destructive"
            className="w-full"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Sign out"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
