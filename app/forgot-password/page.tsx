import { PasswordReset } from "@/components/auth/password-reset"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-sm">
        <PasswordReset />
      </div>
    </div>
  )
}
