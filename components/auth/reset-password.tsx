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
import { resetPassword } from "@/lib/auth-client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Set New Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              value={confirmPassword}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              if (token) {
                await resetPassword(
                  {
                    newPassword: password,
                    token,
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
              }
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Update password"
            )}
          </Button>

          <div className="mt-4 text-center text-sm">
            <Link href="/signin" className="underline underline-offset-4">
              Back to sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
