import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

// Types
interface Integration {
  id: string
  name: string
  description: string
  connected: boolean
}

interface IntegrationLogoProps {
  integration: Integration
}

// Configuration
const INTEGRATION_LOGOS: Record<string, string> = {
  fernand: "/integration-logo/fernand.svg",
  intercom: "/integration-logo/Intercom.svg",
  helpscout: "/integration-logo/HelpScout.svg",
  zendesk: "/integration-logo/Zendesk.svg",
  missive: "/integration-logo/missiveapp.com.svg",
  crisp: "/integration-logo/Crisp Logo.svg",
  gmail: "/integration-logo/gmail.svg",
}

const INTEGRATION_BACKGROUNDS: Record<string, string> = {
  zendesk: "bg-[#03363D]",
  intercom: "bg-black",
  fernand: "bg-white",
  helpscout: "bg-white",
  missive: "bg-white",
  crisp: "bg-white",
  gmail: "bg-white",
}

const FALLBACK_ICONS: Record<string, string> = {
  custom: "🔧",
}

const INTEGRATIONS: Integration[] = [
  {
    id: "fernand",
    name: "Fernand",
    description: "Connect your Fernand account to Ferndesk.",
    connected: false,
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Connect your Intercom account to Ferndesk.",
    connected: false,
  },
  {
    id: "helpscout",
    name: "HelpScout",
    description: "Connect your HelpScout account to Ferndesk.",
    connected: false,
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Connect your Zendesk account to Ferndesk.",
    connected: false,
  },
  {
    id: "missive",
    name: "Missive",
    description: "Connect your Missive account to Ferndesk.",
    connected: false,
  },
  {
    id: "crisp",
    name: "Crisp",
    description: "Connect your Crisp account to Ferndesk.",
    connected: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Connect your Gmail account to Ferndesk.",
    connected: false,
  },
]

// Components
function IntegrationLogo({ integration }: IntegrationLogoProps) {
  const logoPath = INTEGRATION_LOGOS[integration.id]

  if (logoPath) {
    const backgroundClasses =
      INTEGRATION_BACKGROUNDS[integration.id] || "bg-white border-gray-100"

    return (
      <div
        className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border p-2 ${backgroundClasses}`}
      >
        <Image
          src={logoPath}
          alt={`${integration.name} logo`}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
    )
  }

  // Fallback for integrations without logos
  return (
    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-lg">
      <span className="text-xl">{FALLBACK_ICONS[integration.id] || "📦"}</span>
    </div>
  )
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const handleConnect = () => {
    console.log(`Connecting to ${integration.id}`)
  }

  return (
    <Card className="border p-4 shadow-none">
      <div className="space-y-3 text-start">
        <div className="flex justify-start">
          <IntegrationLogo integration={integration} />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{integration.name}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {integration.description}
          </p>
        </div>

        <Button
          variant={integration.connected ? "default" : "outline"}
          size="sm"
          className="h-8 w-full text-xs"
          onClick={handleConnect}
        >
          {integration.connected ? "Connected" : "Connect"}
        </Button>
      </div>
    </Card>
  )
}

// Main Component
export function IntegrationsPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Integrations</h2>
        <p className="text-muted-foreground text-sm">
          Connect your support system to ferndesk to start collecting feedback
          from your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  )
}
