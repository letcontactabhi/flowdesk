import { SignIn } from "@/components/auth/sign-in"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-sm">
        <SignIn />
      </div>
    </div>
  )
}
