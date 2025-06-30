"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Zap, Edit, Trash2, Search } from "lucide-react"

interface AgentActionsProps {
  agent: {
    id: string
    name: string
  }
}

// Mock actions data
const quickReplies = [
  {
    id: "1",
    title: "Password Reset",
    trigger: "reset password",
    response:
      "To reset your password, please visit our reset page at [link] and follow the instructions. You'll receive an email with reset instructions within 5 minutes.",
    category: "Account",
    usageCount: 156,
    isActive: true,
  },
  {
    id: "2",
    title: "Business Hours",
    trigger: "business hours",
    response:
      "Our support team is available Monday through Friday from 9 AM to 6 PM EST. For urgent matters outside these hours, please email urgent@company.com.",
    category: "General",
    usageCount: 89,
    isActive: true,
  },
  {
    id: "3",
    title: "Refund Process",
    trigger: "refund",
    response:
      "We offer refunds within 30 days of purchase. To process your refund, please provide your order number and reason for the refund request.",
    category: "Billing",
    usageCount: 67,
    isActive: true,
  },
  {
    id: "4",
    title: "Escalate to Human",
    trigger: "human support",
    response:
      "I'll connect you with one of our human support representatives. Please hold on while I transfer your conversation.",
    category: "Escalation",
    usageCount: 45,
    isActive: true,
  },
]

const actionCategories = [
  "All",
  "Account",
  "General",
  "Billing",
  "Technical",
  "Escalation",
]

export function AgentActions({ agent }: AgentActionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quick Actions & Replies</h3>
          <p className="text-muted-foreground">
            Predefined responses to common queries
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Action
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input placeholder="Search actions..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          {actionCategories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {quickReplies.map((action) => (
          <Card key={action.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="text-primary h-5 w-5" />
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline">{action.category}</Badge>
                        <Badge
                          variant={action.isActive ? "default" : "secondary"}
                        >
                          {action.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-muted-foreground text-sm">
                          Used {action.usageCount} times
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-sm font-medium">Trigger Keywords</p>
                    <div className="flex gap-2">
                      {action.trigger.split(", ").map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-medium">Response</p>
                    <div className="bg-muted rounded-md p-3 text-sm">
                      {action.response}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Action</CardTitle>
          <CardDescription>
            Add a new quick reply or automated action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Action Title</label>
              <Input placeholder="e.g., Password Reset Help" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="border-input bg-background w-full rounded-md border px-3 py-2">
                <option>Account</option>
                <option>General</option>
                <option>Billing</option>
                <option>Technical</option>
                <option>Escalation</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Trigger Keywords</label>
            <Input placeholder="password, reset, forgot (separate with commas)" />
            <p className="text-muted-foreground text-xs">
              When users mention these keywords, this action will be suggested
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Response</label>
            <Textarea
              placeholder="Write the response that will be sent to users..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Create Action</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Action Analytics</CardTitle>
          <CardDescription>
            Performance metrics for your quick actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-muted-foreground text-sm">Total Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">357</div>
              <div className="text-muted-foreground text-sm">Times Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">89%</div>
              <div className="text-muted-foreground text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1.2s</div>
              <div className="text-muted-foreground text-sm">
                Avg Response Time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
