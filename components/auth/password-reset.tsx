"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export function PasswordReset() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email address and we&rsquo;ll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await authClient.forgetPassword(
                {
                  email,
                  redirectTo: "/reset-password",
                },
                {
                  onRequest: () => {
                    setLoading(true)
                  },
                  onResponse: () => {
                    setLoading(false)
                  },
                }
              )
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Send reset email"
            )}
          </Button>

          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/signin" className="underline underline-offset-4">
              Back to sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
