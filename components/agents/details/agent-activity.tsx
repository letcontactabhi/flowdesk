"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  RefreshCw,
  Filter,
  Download,
  Trash2,
  Users,
  Bot,
  User,
  ArrowLeft,
  MoreVertical,
} from "lucide-react"

interface AgentActivityProps {
  agent: {
    id: string
    name: string
  }
}

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  confidence?: number
}

interface ChatLog {
  id: string
  initialMessage: string
  timestamp: string
  source: string
  messages: ChatMessage[]
  status: "active" | "ended"
  userInfo?: {
    name: string
    email: string
  }
}

// Mock chat logs data
const chatLogs: ChatLog[] = [
  {
    id: "1",
    initialMessage: "Hello! How can I assist you today? 😊",
    timestamp: "Just now",
    source: "Playground",
    status: "active",
    userInfo: {
      name: "craftpad.dev",
      email: "user@craftpad.dev",
    },
    messages: [
      {
        id: "1-1",
        content: "Hi! What can I help you with?",
        sender: "ai",
        timestamp: "Just now",
      },
      {
        id: "1-2",
        content: "hi",
        sender: "user",
        timestamp: "Just now",
      },
      {
        id: "1-3",
        content: "Hello! How can I assist you today? 😊",
        sender: "ai",
        timestamp: "Just now",
        confidence: 0.446,
      },
    ],
  },
  {
    id: "2",
    initialMessage: "What are your pricing plans?",
    timestamp: "5 minutes ago",
    source: "Website Widget",
    status: "ended",
    userInfo: {
      name: "John Smith",
      email: "john@example.com",
    },
    messages: [
      {
        id: "2-1",
        content: "What are your pricing plans?",
        sender: "user",
        timestamp: "5 minutes ago",
      },
      {
        id: "2-2",
        content:
          "We offer three pricing tiers: Starter ($29/month), Professional ($79/month), and Enterprise ($199/month). Each plan includes different features and support levels.",
        sender: "ai",
        timestamp: "5 minutes ago",
        confidence: 0.892,
      },
      {
        id: "2-3",
        content: "Do you have annual discounts?",
        sender: "user",
        timestamp: "4 minutes ago",
      },
      {
        id: "2-4",
        content:
          "Yes! We offer 20% off when you pay annually. This applies to all our plans.",
        sender: "ai",
        timestamp: "4 minutes ago",
        confidence: 0.934,
      },
    ],
  },
  {
    id: "3",
    initialMessage: "How to integrate with Slack?",
    timestamp: "12 minutes ago",
    source: "Intercom",
    status: "ended",
    userInfo: {
      name: "Sarah Wilson",
      email: "sarah@company.com",
    },
    messages: [
      {
        id: "3-1",
        content: "How to integrate with Slack?",
        sender: "user",
        timestamp: "12 minutes ago",
      },
      {
        id: "3-2",
        content:
          "You can integrate with Slack through our integrations page. Go to Settings > Integrations > Slack and follow the setup instructions.",
        sender: "ai",
        timestamp: "12 minutes ago",
        confidence: 0.756,
      },
    ],
  },
]

export function AgentActivity({ agent }: AgentActivityProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"logs" | "leads">("logs")

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleBackToList = () => {
    setSelectedChat(null)
  }

  const selectedChatLog = chatLogs.find((chat) => chat.id === selectedChat)

  // Full conversation view
  if (selectedChat && selectedChatLog) {
    return (
      <div className="bg-card flex h-[800px] rounded-lg border">
        {/* Sidebar */}
        <div className="bg-muted/30 w-64 border-r p-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === "logs" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("logs")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat Logs
            </Button>
            <Button
              variant={activeTab === "leads" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("leads")}
            >
              <Users className="mr-2 h-4 w-4" />
              Leads
            </Button>
          </div>
        </div>

        {/* Full Conversation View */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBackToList}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Conversation Details</h1>
                <p className="text-muted-foreground text-sm">
                  {selectedChatLog.userInfo?.name || "User"} •{" "}
                  {selectedChatLog.timestamp} • Source: {selectedChatLog.source}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {selectedChatLog.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-500 text-white">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[70%] space-y-2 ${
                      message.sender === "user" ? "order-1" : ""
                    }`}
                  >
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>

                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                      <span>{message.timestamp}</span>
                      {message.confidence && (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              message.confidence < 0.5
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            Confidence: {message.confidence.toFixed(3)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                          >
                            Improve answer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gray-500 text-white">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Chat logs list view
  return (
    <div className="bg-card flex h-[800px] rounded-lg border">
      {/* Sidebar */}
      <div className="bg-muted/30 w-64 border-r p-4">
        <div className="space-y-2">
          <Button
            variant={activeTab === "logs" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("logs")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Logs
          </Button>
          <Button
            variant={activeTab === "leads" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("leads")}
          >
            <Users className="mr-2 h-4 w-4" />
            Leads
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-xl font-semibold">Chat logs</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Chat Logs List */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {chatLogs.map((chatLog) => (
              <div
                key={chatLog.id}
                className="bg-muted/50 hover:bg-muted/70 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors"
                onClick={() => handleChatSelect(chatLog.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <span className="font-medium">
                      {chatLog.initialMessage}
                    </span>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <span>{chatLog.timestamp}</span>
                      <span>•</span>
                      <span>Source: {chatLog.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      chatLog.status === "active" ? "default" : "secondary"
                    }
                  >
                    {chatLog.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle delete
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
