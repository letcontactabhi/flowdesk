"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BarChart3, Activity, Users } from "lucide-react"

interface AgentAnalyticsProps {
  agent: {
    conversations: number
    responseRate: string
    avgResponseTime: string
    fallbackRate: string
  }
}

export function AgentAnalytics({ agent }: AgentAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversations
            </CardTitle>
            <MessageSquare className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.conversations}</div>
            <p className="text-muted-foreground text-xs">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.responseRate}</div>
            <p className="text-muted-foreground text-xs">+2% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.avgResponseTime}</div>
            <p className="text-muted-foreground text-xs">
              -0.2s from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fallback Rate</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.fallbackRate}</div>
            <p className="text-muted-foreground text-xs">-1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Conversation Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-[200px] items-center justify-center">
              Chart placeholder - implement with your preferred charting library
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-[200px] items-center justify-center">
              Chart placeholder - implement with your preferred charting library
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
