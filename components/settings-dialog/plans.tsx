import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"

// Types
interface PlanFeature {
  name: string
  included: boolean
}

interface Plan {
  id: string
  name: string
  description: string
  price: string
  billing: string
  popular?: boolean
  features: PlanFeature[]
  buttonText: string
  buttonVariant: "default" | "outline"
}

// Configuration
const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    billing: "Forever free",
    features: [
      { name: "Up to 100 conversations/month", included: true },
      { name: "1 AI Agent", included: true },
      { name: "Basic integrations", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams",
    price: "$29",
    billing: "per month",
    popular: true,
    features: [
      { name: "Up to 1,000 conversations/month", included: true },
      { name: "5 AI Agents", included: true },
      { name: "All integrations", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom branding", included: true },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: "$99",
    billing: "per month",
    features: [
      { name: "Unlimited conversations", included: true },
      { name: "Unlimited AI Agents", included: true },
      { name: "All integrations", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom branding", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "default",
  },
]

// Components
function PlanCard({ plan }: { plan: Plan }) {
  const handlePlanAction = () => {
    console.log(`Action for ${plan.id} plan`)
    // Here you would implement the actual plan upgrade/contact logic
  }

  return (
    <Card
      className={`relative p-6 ${plan.popular ? "border-primary shadow-lg" : "border"}`}
    >
      {plan.popular && (
        <Badge
          variant="default"
          className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2"
        >
          <Crown className="mr-1 h-3 w-3" />
          Most Popular
        </Badge>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            {plan.name}
            {plan.id === "enterprise" && (
              <Zap className="h-4 w-4 text-yellow-500" />
            )}
          </h3>
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground text-sm">
              {plan.billing}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Features included:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    feature.included
                      ? "text-green-600"
                      : "text-muted-foreground opacity-40"
                  }`}
                />
                <span
                  className={
                    feature.included ? "" : "text-muted-foreground line-through"
                  }
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant={plan.buttonVariant}
          className="w-full"
          onClick={handlePlanAction}
          disabled={plan.id === "free"}
        >
          {plan.buttonText}
        </Button>
      </div>
    </Card>
  )
}

// Main Component
export function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Plans & Billing</h2>
        <p className="text-muted-foreground text-sm">
          Choose the plan that best fits your needs. You can upgrade or
          downgrade at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Need a custom solution?</h3>
          <p className="text-muted-foreground text-sm">
            Contact our sales team to discuss enterprise features, custom
            integrations, and volume pricing for your organization.
          </p>
          <Button variant="outline" size="sm">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  )
}
