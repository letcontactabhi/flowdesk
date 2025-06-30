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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Mail,
  MessageSquare,
  Calendar,
  Filter,
  MoreHorizontal,
} from "lucide-react"

interface AgentContactsProps {
  agent: {
    id: string
    name: string
  }
}

// Mock contacts data
const contacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    avatar: "",
    status: "active",
    conversationsCount: 12,
    lastContact: "2 hours ago",
    firstContact: "3 weeks ago",
    tags: ["VIP", "Enterprise"],
    location: "New York, US",
    totalValue: "$2,400",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@startup.com",
    company: "StartupCo",
    avatar: "",
    status: "new",
    conversationsCount: 3,
    lastContact: "1 day ago",
    firstContact: "1 week ago",
    tags: ["Trial"],
    location: "San Francisco, US",
    totalValue: "$0",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@techfirm.com",
    company: "TechFirm Inc",
    avatar: "",
    status: "inactive",
    conversationsCount: 8,
    lastContact: "2 weeks ago",
    firstContact: "2 months ago",
    tags: ["Premium"],
    location: "Toronto, CA",
    totalValue: "$1,200",
  },
  {
    id: "4",
    name: "Emma Brown",
    email: "emma@agency.com",
    company: "Creative Agency",
    avatar: "",
    status: "active",
    conversationsCount: 15,
    lastContact: "30 minutes ago",
    firstContact: "1 month ago",
    tags: ["Premium", "Support"],
    location: "London, UK",
    totalValue: "$3,600",
  },
]

const statusFilters = [
  { label: "All", value: "all", count: 156 },
  { label: "Active", value: "active", count: 89 },
  { label: "New", value: "new", count: 23 },
  { label: "Inactive", value: "inactive", count: 44 },
]

export function AgentContacts({ agent }: AgentContactsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Contact Database</h3>
          <p className="text-muted-foreground">
            Users who have interacted with your AI agent
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Export Contacts
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input placeholder="Search contacts..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={filter.value === "all" ? "default" : "outline"}
              size="sm"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{contact.email}</span>
                        <span>•</span>
                        <span>{contact.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          contact.status === "active"
                            ? "default"
                            : contact.status === "new"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {contact.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="text-muted-foreground h-4 w-4" />
                      <span>{contact.conversationsCount} conversations</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span>Last contact: {contact.lastContact}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Value: {contact.totalValue}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {contact.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-muted-foreground ml-2 text-xs">
                      {contact.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">156</div>
              <div className="text-muted-foreground text-sm">
                Total Contacts
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">89</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">23</div>
              <div className="text-muted-foreground text-sm">New This Week</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">$47.2k</div>
              <div className="text-muted-foreground text-sm">Total Value</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Insights</CardTitle>
          <CardDescription>
            Analytics about your contact interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Most Active Time</span>
              <span className="text-sm font-medium">2:00 PM - 4:00 PM EST</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Common Issues</span>
              <span className="text-sm font-medium">
                Password Reset (34%), Billing (28%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Conversations</span>
              <span className="text-sm font-medium">3.2 per contact</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Resolution Rate</span>
              <span className="text-sm font-medium text-green-600">94%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
