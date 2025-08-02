"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  { month: "January", csat: 4.2 },
  { month: "February", csat: 4.5 },
  { month: "March", csat: 4.3 },
  { month: "April", csat: 4.6 },
  { month: "May", csat: 4.4 },
  { month: "June", csat: 4.7 },
]

const chartConfig = {
  csat: {
    label: "CSAT Score",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function CustomerSatisfactionChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Customer Satisfaction</CardTitle>
        <CardDescription>
          Average CSAT score over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
            <Line
              dataKey="csat"
              type="natural"
              stroke="var(--color-csat)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-csat)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 8.3% this month <TrendingUp className="h-4 w-4" />
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
