import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { organization } from "better-auth/plugins"
import { PrismaClient } from "./generated/prisma"

const prisma = new PrismaClient()

// Email sending function using Resend
async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY environment variable is not set")
    throw new Error("Email service not configured")
  }

  try {
    const { Resend } = require("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@shortreel.cc",
      to,
      subject,
      html,
    })

    console.log(`✅ Email sent successfully to ${to}`)
    return result
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === "production", // Require in production
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        "Reset your password",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <p>Best regards,<br>Your App Team</p>
        </div>
        `
      )
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Replace the domain with shortreel.cc for verification emails
      const verificationUrl = url.replace(
        /^https?:\/\/[^\/]+/,
        "https://shortreel.cc"
      )

      await sendEmail(
        user.email,
        "Verify your email address",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify Your Email</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #28a745; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <p>Best regards,<br>Your App Team</p>
        </div>
        `
      )
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account", // Always ask user to select account
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (update session every day)
  },
  plugins: [
    nextCookies(),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 5,
      membershipLimit: 50,
      invitationExpiresIn: 60 * 60 * 24 * 7, // 7 days
      sendInvitationEmail: async (data) => {
        const inviteLink = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/accept-invitation/${data.id}`

        await sendEmail(
          data.email,
          `You're invited to join ${data.organization.name}`,
          `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>You're Invited!</h2>
            <p>Hi there,</p>
            <p><strong>${data.inviter.user.name || data.inviter.user.email}</strong> has invited you to join <strong>${data.organization.name}</strong>.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${inviteLink}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Accept Invitation
              </a>
            </div>
            <p>This invitation will expire in 7 days.</p>
            <p>If you don't want to join this organization, you can safely ignore this email.</p>
            <p>Best regards,<br>Your App Team</p>
          </div>
          `
        )
      },
    }),
  ],
  trustedOrigins: ["http://localhost:3000"],
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-for-development",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})

export type Session = typeof auth.$Infer.Session
