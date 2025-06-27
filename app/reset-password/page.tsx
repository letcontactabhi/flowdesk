import { Suspense } from "react"
import { ResetPassword } from "@/components/auth/reset-password"
import { Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
            </div>
          }
        >
          <ResetPassword />
        </Suspense>
      </div>
    </div>
  )
}
