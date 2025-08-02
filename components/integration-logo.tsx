import Image from "next/image"
import { MessageCircle } from "lucide-react"

// MVP: Gmail-only configuration
const INTEGRATION_LOGOS: Record<string, string> = {
  gmail: "/integration-logo/gmail.svg",
}

const INTEGRATION_BACKGROUNDS: Record<string, string> = {
  gmail: "bg-white",
}

const FALLBACK_ICONS: Record<string, string> = {
  custom: "🔧",
}

interface IntegrationLogoProps {
  integrationId: string
  integrationName: string
  size?: "sm" | "md" | "lg"
  className?: string
  selected?: boolean
  variant?: "default" | "chip"
}

export function IntegrationLogo({
  integrationId,
  integrationName,
  size = "md",
  className = "",
  selected = false,
  variant = "default",
}: IntegrationLogoProps) {
  const logoPath = INTEGRATION_LOGOS[integrationId]

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const imageSizeClasses = {
    sm: "h-2.5 w-2.5",
    md: "h-4 w-4",
    lg: "h-8 w-8",
  }

  const imageSizes = {
    sm: { width: 10, height: 10 },
    md: { width: 16, height: 16 },
    lg: { width: 32, height: 32 },
  }

  // For chip variant (small logos in selected chips)
  if (variant === "chip") {
    return logoPath ? (
      <div
        className={`flex h-4 w-4 items-center justify-center rounded ${
          integrationId === "intercom"
            ? "bg-black"
            : integrationId === "zendesk"
              ? "bg-[#03363D]"
              : "bg-white/20"
        } ${className}`}
      >
        <Image
          src={logoPath}
          alt={`${integrationName} logo`}
          width={10}
          height={10}
          className="h-2.5 w-2.5 object-contain"
        />
      </div>
    ) : (
      <span className="text-xl">{FALLBACK_ICONS[integrationId] || "📦"}</span>
    )
  }

  // Default variant
  if (logoPath) {
    const backgroundClasses = selected
      ? "border-primary/20 bg-primary/10"
      : integrationId === "intercom"
        ? "border-gray-200 bg-black group-hover:border-gray-300"
        : integrationId === "zendesk"
          ? "border-gray-200 bg-[#03363D] group-hover:border-gray-300"
          : size === "lg"
            ? `${INTEGRATION_BACKGROUNDS[integrationId] || "bg-white"} border-gray-100`
            : "border-gray-200 bg-white group-hover:border-gray-300"

    return (
      <div
        className={`flex ${sizeClasses[size]} flex-shrink-0 items-center justify-center rounded-${size === "lg" ? "lg" : "md"} border transition-colors ${backgroundClasses} ${
          size === "lg" ? "p-2" : ""
        } ${className}`}
      >
        <Image
          src={logoPath}
          alt={`${integrationName} logo`}
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className={`${imageSizeClasses[size]} object-contain`}
        />
      </div>
    )
  }

  // Fallback for integrations without logos
  return (
    <div
      className={`bg-muted flex ${sizeClasses[size]} items-center justify-center rounded-${size === "lg" ? "lg" : "md"} ${className}`}
    >
      {size === "sm" ? (
        <MessageCircle className="text-muted-foreground h-2 w-2" />
      ) : size === "md" ? (
        <MessageCircle className="text-muted-foreground h-4 w-4" />
      ) : (
        <span className="text-xl">{FALLBACK_ICONS[integrationId] || "📦"}</span>
      )}
    </div>
  )
}

// Export the configuration for external use if needed
export { INTEGRATION_LOGOS, INTEGRATION_BACKGROUNDS }
