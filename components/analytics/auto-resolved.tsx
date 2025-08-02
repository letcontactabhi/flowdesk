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
  { month: "January", percentage: 68 },
  { month: "February", percentage: 72 },
  { month: "March", percentage: 75 },
  { month: "April", percentage: 71 },
  { month: "May", percentage: 78 },
  { month: "June", percentage: 82 },
]

const chartConfig = {
  percentage: {
    label: "Auto-resolved (%)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function AutoResolvedChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Auto-resolved</CardTitle>
        <CardDescription>
          Percentage of conversations resolved automatically
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
              dataKey="percentage"
              type="natural"
              fill="var(--color-percentage)"
              fillOpacity={0.4}
              stroke="var(--color-percentage)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 6.2% this month <TrendingUp className="h-4 w-4" />
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
