"use client"

import React from "react"
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
import { MessageSquare, Clock, CheckCircle, XCircle, Eye } from "lucide-react"

interface AgentActivityProps {
  agent: {
    id: string
    name: string
  }
}

// Mock activity data
const activities = [
  {
    id: "1",
    user: { name: "John Doe", email: "john@example.com", avatar: "" },
    query: "How do I reset my password?",
    response:
      "You can reset your password by clicking the 'Forgot Password' link on the login page...",
    status: "answered",
    confidence: 0.95,
    timestamp: "2 minutes ago",
    channel: "Website",
  },
  {
    id: "2",
    user: { name: "Sarah Wilson", email: "sarah@example.com", avatar: "" },
    query: "What are your refund policies?",
    response: "Our refund policy allows returns within 30 days of purchase...",
    status: "answered",
    confidence: 0.87,
    timestamp: "15 minutes ago",
    channel: "Chat Widget",
  },
  {
    id: "3",
    user: { name: "Mike Chen", email: "mike@example.com", avatar: "" },
    query: "How to integrate your API with Python?",
    response:
      "I don't have specific information about Python API integration. Let me connect you with our technical team.",
    status: "escalated",
    confidence: 0.23,
    timestamp: "1 hour ago",
    channel: "Support Email",
  },
  {
    id: "4",
    user: { name: "Emma Brown", email: "emma@example.com", avatar: "" },
    query: "Is there a mobile app available?",
    response: "Yes, we have mobile apps available for both iOS and Android...",
    status: "answered",
    confidence: 0.91,
    timestamp: "2 hours ago",
    channel: "Intercom",
  },
]

export function AgentActivity({ agent }: AgentActivityProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-muted-foreground text-sm">Today's Queries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">22</p>
                <p className="text-muted-foreground text-sm">Answered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-muted-foreground text-sm">Escalated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">2.3s</p>
                <p className="text-muted-foreground text-sm">Avg Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Latest queries handled by your AI agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="hover:bg-muted/50 flex gap-4 rounded-lg border p-4 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{activity.user.name}</h4>
                      <span className="text-muted-foreground text-sm">•</span>
                      <span className="text-muted-foreground text-sm">
                        {activity.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{activity.channel}</Badge>
                      <Badge
                        variant={
                          activity.status === "answered"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Query:</p>
                      <p className="text-muted-foreground text-sm">
                        {activity.query}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Response:</p>
                      <p className="text-muted-foreground text-sm">
                        {activity.response}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        Confidence:
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                          <div
                            className={`h-full transition-all ${
                              activity.confidence > 0.8
                                ? "bg-green-500"
                                : activity.confidence > 0.6
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${activity.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round(activity.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
