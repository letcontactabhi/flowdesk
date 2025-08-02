import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  Bot,
  Clock,
  Github,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/branding/logo.svg"
                alt="flowdesk logo"
                width={32}
                height={32}
                className="text-primary"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                flowdesk
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get Started</Link>
            </Button>
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="icon">
                <Link href="https://github.com">
                  <Github className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Sun className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 text-sm">
              <Sparkles className="mr-1 size-3" />
              Now with GPT-4 Integration
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Transform support into
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                {" "}AI magic
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Automate 80% of your customer support with intelligent AI agents. 
              Reduce response time from hours to seconds while delighting your customers.
            </p>

            <div className="mx-auto mb-8 flex max-w-lg flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 h-12 text-base"
              />
              <Button size="lg" className="h-12 px-8 text-base font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✨ Free 14-day trial • No credit card required • Setup in 5 minutes
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
          <div className="h-96 w-96 rounded-full bg-gradient-to-r from-primary to-primary/50 blur-3xl"></div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-8 text-sm font-medium text-muted-foreground">
              TRUSTED BY FORWARD-THINKING COMPANIES
            </p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 rounded bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Everything you need to scale support
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful AI-driven tools designed to transform your customer support experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="size-6 text-primary" />
                </div>
                <CardTitle className="mb-2 text-xl">Intelligent AI Agents</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Advanced AI that understands context and provides accurate, 
                  human-like responses to customer queries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Clock className="size-6 text-green-600" />
                </div>
                <CardTitle className="mb-2 text-xl">24/7 Instant Support</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Never miss a customer query. Provide instant responses 
                  around the clock, even when your team is offline.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <TrendingUp className="size-6 text-blue-600" />
                </div>
                <CardTitle className="mb-2 text-xl">Analytics & Insights</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Deep insights into customer behavior, common issues, 
                  and support performance metrics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Zap className="size-6 text-purple-600" />
                </div>
                <CardTitle className="mb-2 text-xl">Quick Integration</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get started in minutes with our simple embed code. 
                  Works with any website or platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <Shield className="size-6 text-orange-600" />
                </div>
                <CardTitle className="mb-2 text-xl">Enterprise Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Bank-level security with SOC2 compliance, 
                  data encryption, and privacy protection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                  <Users className="size-6 text-red-600" />
                </div>
                <CardTitle className="mb-2 text-xl">Team Collaboration</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Seamless handoff between AI and human agents. 
                  Perfect for complex queries that need human touch.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary lg:text-4xl">95%</div>
              <div className="text-sm font-medium text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary lg:text-4xl">2.3s</div>
              <div className="text-sm font-medium text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary lg:text-4xl">80%</div>
              <div className="text-sm font-medium text-muted-foreground">Support Load Reduced</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary lg:text-4xl">500+</div>
              <div className="text-sm font-medium text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to transform your support?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Join hundreds of companies already using flowdesk to delight their customers.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-12 px-8 text-base font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Schedule Demo
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 rating</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div>14-day free trial</div>
            <div className="h-4 w-px bg-border"></div>
            <div>No setup fees</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/branding/logo.svg"
                alt="flowdesk logo"
                width={24}
                height={24}
              />
              <span className="text-lg font-semibold">flowdesk</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Support</Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon">
                <Link href="https://github.com">
                  <Github className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="https://discord.com">
                  <MessageCircle className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2024 flowdesk. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
