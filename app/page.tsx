import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  Github,
  MessageCircle,
  Twitter,
  Sun,
  Bot,
  Zap,
  TrendingDown,
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="w-full border-b">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between border-r border-l px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/branding/logo.svg"
              alt="flowdesk logo"
              width={24}
              height={24}
              className="text-primary"
            />
            <h1 className="text-2xl font-bold">flowdesk</h1>
          </div>
          <div className="flex items-center">
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
            <Button asChild variant="ghost" size="icon">
              <Link href="https://twitter.com">
                <Twitter className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Sun className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto min-h-screen max-w-5xl space-y-8 border-r border-l px-6">
        {/* Hero Content */}
        <main className="flex flex-col items-center justify-center pt-20">
          <div className="max-w-2xl space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-lg leading-tight font-bold md:text-4xl">
                Turn repetitive support chats into
                <br />
                <span className="text-primary">instant AI replies 24/7</span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-lg text-sm">
                flowdesk transforms your most common support questions into
                lightning-fast AI responses, cutting support costs while
                delighting customers.
              </p>
            </div>

            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="your@company.com"
                className="flex-1"
              />
              <Button
                size="lg"
                className="bg-cta text-cta-foreground hover:bg-cta-hover"
              >
                Start Free Trial
              </Button>
            </div>

            <p className="text-muted-foreground text-sm">
              Join 500+ companies automating their support
            </p>
          </div>
        </main>

        {/* divider */}
        <div className="mx-auto flex max-w-sm items-center justify-center">
          <div className="bg-muted size-3 rounded-sm"></div>
          <div className="border-border flex-1 border-t"></div>
          <div className="bg-muted size-3 rounded-sm"></div>
        </div>

        {/* Benefits Content */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-semibold">
              Instant AI replies for common questions
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-4 text-center">
                <Image
                  src="/branding/logo.svg"
                  alt="Instant Responses"
                  width={24}
                  height={24}
                  className="text-primary"
                />
                <CardTitle className="text-muted-foreground text-base">
                  Instant Responses
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  AI replies to repetitive questions in under 2 seconds, 24/7.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-4 text-center">
                <Zap className="text-accent-foreground size-6" />
                <CardTitle className="text-muted-foreground text-base">
                  Zero Setup Time
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Deploy in minutes. Just embed our chat widget and start saving
                  time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center space-y-2 p-4 text-center">
                <TrendingDown className="text-destructive size-6" />
                <CardTitle className="text-muted-foreground text-base">
                  Cut Support Load
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Handle 80% of repetitive questions automatically, focus on
                  complex issues.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
