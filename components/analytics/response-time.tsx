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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", seconds: 24 },
  { month: "February", seconds: 18 },
  { month: "March", seconds: 22 },
  { month: "April", seconds: 15 },
  { month: "May", seconds: 12 },
  { month: "June", seconds: 8 },
]

const chartConfig = {
  seconds: {
    label: "Response Time (seconds)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ResponseTimeChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Response Time</CardTitle>
        <CardDescription>
          Average response time in seconds
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
              dataKey="seconds"
              type="natural"
              fill="var(--color-seconds)"
              fillOpacity={0.4}
              stroke="var(--color-seconds)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending down by 12.5% this month <TrendingUp className="h-4 w-4" />
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
