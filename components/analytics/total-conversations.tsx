"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", ai: 186, human: 80 },
  { month: "February", ai: 305, human: 200 },
  { month: "March", ai: 237, human: 120 },
  { month: "April", ai: 373, human: 90 },
  { month: "May", ai: 409, human: 130 },
  { month: "June", ai: 514, human: 140 },
]

const chartConfig = {
  ai: {
    label: "AI Handled",
    color: "var(--chart-1)",
  },
  human: {
    label: "Human Handled",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TotalConversationsChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Total Conversations</CardTitle>
        <CardDescription>
          AI vs Human handled conversations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="human"
              type="natural"
              fill="var(--color-human)"
              fillOpacity={0.4}
              stroke="var(--color-human)"
              stackId="a"
            />
            <Area
              dataKey="ai"
              type="natural"
              fill="var(--color-ai)"
              fillOpacity={0.4}
              stroke="var(--color-ai)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 15.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
