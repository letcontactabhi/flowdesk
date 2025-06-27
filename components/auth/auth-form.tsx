import { ReactNode } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

interface AuthFormProps {
  title: string
  description: string
  children: ReactNode
  error?: string
  success?: string
  footer?: ReactNode
  className?: string
}

export function AuthForm({
  title,
  description,
  children,
  error,
  success,
  footer,
  className = "",
}: AuthFormProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {children}

        {footer && (
          <div className="border-border mt-6 border-t pt-6">{footer}</div>
        )}
      </CardContent>
    </Card>
  )
}
