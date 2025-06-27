"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChatWidget } from "@/components/chat-widget"
import { Bot, MessageCircle, Zap } from "lucide-react"

export default function DemoPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-primary h-8 w-8" />
              <h1 className="text-2xl font-bold">Acme Support</h1>
            </div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome to Acme Support
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Experience instant AI replies for repetitive support questions. Try
            asking about products, account management, or technical issues.
          </p>
        </div>

        {/* Demo Content */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-primary h-5 w-5" />
                Try Our AI Assistant
              </CardTitle>
              <CardDescription>
                Click the chat button in the bottom right to start a
                conversation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Sample Questions to Try:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• "How do I reset my password?"</li>
                  <li>• "What are your pricing plans?"</li>
                  <li>• "How do I upgrade my account?"</li>
                  <li>• "I'm having trouble logging in"</li>
                  <li>• "How do I cancel my subscription?"</li>
                </ul>
              </div>
              <Button
                onClick={() => setIsChatOpen(true)}
                className="bg-cta text-cta-foreground hover:bg-cta-hover w-full"
              >
                Start Chat Demo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                AI Features
              </CardTitle>
              <CardDescription>
                See what makes our AI assistant special
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">Instant Responses</p>
                    <p className="text-xs text-gray-600">
                      Get answers in under 2 seconds
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">24/7 Availability</p>
                    <p className="text-xs text-gray-600">
                      Always ready to help
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">Smart Escalation</p>
                    <p className="text-xs text-gray-600">
                      Seamless handoff to human agents
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium">Contextual Answers</p>
                    <p className="text-xs text-gray-600">
                      Understands your specific needs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-primary text-3xl font-bold">2.1s</div>
            <div className="text-muted-foreground text-sm">
              Avg Response Time
            </div>
          </div>
          <div className="text-center">
            <div className="text-primary text-3xl font-bold">94%</div>
            <div className="text-muted-foreground text-sm">Resolution Rate</div>
          </div>
          <div className="text-center">
            <div className="text-primary text-3xl font-bold">24/7</div>
            <div className="text-muted-foreground text-sm">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-primary text-3xl font-bold">80%</div>
            <div className="text-muted-foreground text-sm">Cost Reduction</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground text-center text-sm">
          <p>This is a demo of flowdesk's AI-powered support system</p>
          <p className="mt-1">
            Powered by{" "}
            <span className="text-primary font-medium">flowdesk AI</span>
          </p>
        </div>
      </main>

      {/* Chat Widget */}
      <ChatWidget
        organizationId="demo-org"
        welcomeMessage="Hi! I'm your AI support assistant. How can I help you today?"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}
