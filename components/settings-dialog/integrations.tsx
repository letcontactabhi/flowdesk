import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IntegrationLogo } from "@/components/integration-logo"

// Types
interface Integration {
  id: string
  name: string
  description: string
  connected: boolean
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
function IntegrationCard({ integration }: { integration: Integration }) {
  const handleConnect = () => {
    console.log(`Connecting to ${integration.id}`)
  }

  return (
    <Card className="border p-4 shadow-none">
      <div className="space-y-3 text-start">
        <div className="flex justify-start">
          <IntegrationLogo
            integrationId={integration.id}
            integrationName={integration.name}
            size="lg"
          />
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
