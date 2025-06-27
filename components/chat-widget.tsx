"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  isFromAI: boolean
  createdAt: Date
}

interface ChatWidgetProps {
  organizationId: string
  primaryColor?: string
  welcomeMessage?: string
  isOpen?: boolean
  onToggle?: () => void
}

export function ChatWidget({
  organizationId,
  welcomeMessage = "Hi! How can I help you today?",
  isOpen = false,
  onToggle,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: welcomeMessage,
      role: "assistant",
      isFromAI: true,
      createdAt: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      isFromAI: false,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationId,
          organizationId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: data.messageId,
          content: data.response,
          role: "assistant",
          isFromAI: true,
          createdAt: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setConversationId(data.conversationId)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        isFromAI: true,
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 h-96 w-80">
      <Card className="flex h-full flex-col shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground flex-shrink-0 px-4 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary-foreground text-sm font-medium">
              Support Chat
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span className="text-primary-foreground/90 text-xs">Online</span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === "assistant" && (
                      <Bot className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    )}
                    <div className="text-sm">{message.content}</div>
                  </div>
                  {message.isFromAI && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      AI
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-gray-100 p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-500">
              Powered by flowdesk AI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
