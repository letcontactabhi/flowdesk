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
// import Link from "next/link"

export function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Update Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Change your current password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              required
              onChange={(e) => {
                setCurrentPassword(e.target.value)
              }}
              value={currentPassword}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              required
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
              value={newPassword}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
              setLoading(true)
              try {
                await fetch("/api/auth/update-password", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    currentPassword,
                    newPassword,
                  }),
                })
              } finally {
                setLoading(false)
              }
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Update password"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
