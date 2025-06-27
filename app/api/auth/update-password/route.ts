/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Get the current session
    const headersList = await headers()
    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get the auth context for server-side operations
    const ctx = await auth.$context

    // Get user's current password from database
    const account = await ctx.internalAdapter.findAccount({
      userId: session.user.id,
      providerId: "credential",
    })

    if (!account || !account.password) {
      return NextResponse.json(
        { message: "No password found for this account" },
        { status: 400 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await ctx.password.verify(
      currentPassword,
      account.password
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await ctx.password.hash(newPassword)

    // Update password
    await ctx.internalAdapter.updatePassword(session.user.id, hashedNewPassword)

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
