"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, RotateCcw, Send, Smile } from "lucide-react"
import React, { useState } from "react"

interface AgentPlaygroundProps {
  agent: {
    id: string
    name: string
    description: string
  }
}

type Message = {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
}

// Mock conversation data
const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot" as const,
    content: "Hi! What can I help you with?",
    timestamp: new Date(),
  },
]

export function AgentPlayground({ agent }: AgentPlaygroundProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I understand your question. Based on my training data, here's what I can help you with...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleRefresh = () => {
    setMessages(initialMessages)
    setInput("")
    setIsLoading(false)
  }

  return (
    <div className="mx-auto h-full max-w-md">
      <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-2xl border shadow-lg">
        {/* Header */}
        <div className="bg-card border-border flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <div className="text-foreground text-sm font-medium">
            {agent.name}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="hover:bg-muted h-8 w-8 p-0"
          >
            <RotateCcw className="text-muted-foreground h-4 w-4" />
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col bg-white">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  {message.type === "bot" && (
                    <Avatar className="bg-muted h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    {message.type === "bot" && (
                      <div className="text-foreground mb-1 text-sm font-medium">
                        {agent.name}
                      </div>
                    )}
                    <div
                      className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-card text-foreground border-border border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="bg-muted h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-foreground mb-1 text-sm font-medium">
                      {agent.name}
                    </div>
                    <div className="bg-card border-border inline-block rounded-2xl border px-4 py-2">
                      <div className="flex gap-1">
                        <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full" />
                        <div
                          className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-border bg-card border-t px-4 py-2">
            <div className="mb-2 flex items-center justify-center">
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <Bot className="h-3 w-3" />
                Powered by flowdesk
              </span>
            </div>

            {/* Input Area */}
            <div className="bg-muted border-border flex items-center gap-2 rounded-full border px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-muted h-8 w-8 flex-shrink-0 p-0"
              >
                <Smile className="text-muted-foreground h-4 w-4" />
              </Button>
              <Input
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="placeholder:text-muted-foreground flex-1 border-0 bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 w-8 flex-shrink-0 rounded-full p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
