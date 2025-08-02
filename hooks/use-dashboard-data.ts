import { useState } from 'react'

interface DashboardMetrics {
  deflectionRate: number
  avgResponseTime: number
  csat: number
  costSavings: number
}

interface DeflectionData {
  day: string
  deflection: number
}

interface CSATData {
  day: string
  csat: number
}

interface ResponseTimeData {
  day: string
  responseTime: number
}

interface CostSavingsData {
  month: string
  savings: number
}

interface TicketVolumeData {
  day: string
  aiResolved: number
  humanResolved: number
}

interface SourcesData {
  source: string
  tickets: number
  fill: string
}

interface TokenUsageData {
  day: string
  tokens: number
}

interface TopIssuesData {
  issue: string
  resolved: number
  total: number
}

interface SourceHealthData {
  source: string
  status: 'connected' | 'disconnected' | 'error'
  lastSync: string
}

export function useDashboardData() {
  const [metrics] = useState<DashboardMetrics>({
    deflectionRate: 82,
    avgResponseTime: 2.3,
    csat: 4.6,
    costSavings: 1320,
  })

  const [deflectionData] = useState<DeflectionData[]>([
    { day: "Mon", deflection: 78 },
    { day: "Tue", deflection: 80 },
    { day: "Wed", deflection: 82 },
    { day: "Thu", deflection: 85 },
    { day: "Fri", deflection: 83 },
    { day: "Sat", deflection: 79 },
    { day: "Sun", deflection: 81 },
  ])

  const [csatData] = useState<CSATData[]>([
    { day: "Mon", csat: 4.2 },
    { day: "Tue", csat: 4.5 },
    { day: "Wed", csat: 4.6 },
    { day: "Thu", csat: 4.7 },
    { day: "Fri", csat: 4.4 },
    { day: "Sat", csat: 4.3 },
    { day: "Sun", csat: 4.6 },
  ])

  const [responseTimeData] = useState<ResponseTimeData[]>([
    { day: "Mon", responseTime: 2.5 },
    { day: "Tue", responseTime: 2.1 },
    { day: "Wed", responseTime: 2.3 },
    { day: "Thu", responseTime: 1.9 },
    { day: "Fri", responseTime: 2.4 },
    { day: "Sat", responseTime: 2.6 },
    { day: "Sun", responseTime: 2.2 },
  ])

  const [costSavingsData] = useState<CostSavingsData[]>([
    { month: "Jan", savings: 800 },
    { month: "Feb", savings: 1200 },
    { month: "Mar", savings: 1320 },
    { month: "Apr", savings: 1100 },
    { month: "May", savings: 1450 },
    { month: "Jun", savings: 1600 },
  ])

  const [ticketVolumeData] = useState<TicketVolumeData[]>([
    { day: "Mon", aiResolved: 45, humanResolved: 12 },
    { day: "Tue", aiResolved: 52, humanResolved: 8 },
    { day: "Wed", aiResolved: 48, humanResolved: 15 },
    { day: "Thu", aiResolved: 61, humanResolved: 9 },
    { day: "Fri", aiResolved: 55, humanResolved: 14 },
    { day: "Sat", aiResolved: 43, humanResolved: 11 },
    { day: "Sun", aiResolved: 39, humanResolved: 7 },
  ])

  const [sourcesData] = useState<SourcesData[]>([
    { source: "Intercom", tickets: 156, fill: "hsl(var(--chart-1))" },
    { source: "Gmail", tickets: 89, fill: "hsl(var(--chart-2))" },
    { source: "Zendesk", tickets: 67, fill: "hsl(var(--chart-3))" },
  ])

  const [tokenUsageData] = useState<TokenUsageData[]>([
    { day: "Mon", tokens: 85 },
    { day: "Tue", tokens: 92 },
    { day: "Wed", tokens: 78 },
    { day: "Thu", tokens: 105 },
    { day: "Fri", tokens: 88 },
    { day: "Sat", tokens: 76 },
    { day: "Sun", tokens: 94 },
  ])

  const [topIssuesData] = useState<TopIssuesData[]>([
    { issue: "Password reset", resolved: 124, total: 130 },
    { issue: "Billing questions", resolved: 89, total: 95 },
    { issue: "Account access", resolved: 67, total: 72 },
    { issue: "Feature requests", resolved: 45, total: 60 },
    { issue: "Technical support", resolved: 34, total: 55 },
  ])

  const [sourceHealthData] = useState<SourceHealthData[]>([
    { source: "Intercom", status: "connected", lastSync: "2 min ago" },
    { source: "Gmail", status: "connected", lastSync: "5 min ago" },
    { source: "Zendesk", status: "connected", lastSync: "1 min ago" },
  ])

  return {
    metrics,
    deflectionData,
    csatData,
    responseTimeData,
    costSavingsData,
    ticketVolumeData,
    sourcesData,
    tokenUsageData,
    topIssuesData,
    sourceHealthData,
  }
} 