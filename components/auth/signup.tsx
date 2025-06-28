"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { authClient, organization } from "@/lib/auth-client"
import Link from "next/link"
import { toast } from "sonner"
import { OnboardingDialog } from "@/components/onboarding-dialog"
import { useRouter } from "next/navigation"

export function SignUp() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const [loading, setLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSignUp = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords don't match")
      return
    }

    setLoading(true)

    try {
      // Create the user account
      const signUpResult = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
      })

      if (signUpResult.error) {
        throw new Error(signUpResult.error.message)
      }

      toast.success("Account created successfully!")

      // Show onboarding dialog
      setShowOnboarding(true)
    } catch (error: unknown) {
      console.error("Signup error:", error)
      toast.error(
        error instanceof Error ? error.message : "Failed to create account"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleOnboardingComplete = () => {
    router.push("/dashboard")
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Create your account to get started with Flowdesk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                value={firstName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                value={lastName}
              />
            </div>
          </div>
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

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-confirmation">Confirm Password</Label>
            <Input
              id="password-confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm Password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </CardContent>

      <OnboardingDialog
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </Card>
  )
}
