<script setup lang="ts">
import type {
  ChartConfig,
} from "@/components/ui/chart"
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue"

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart"


const data = [
  {
    day: 1,
    dayLabel: "Mon",
    jobsPosted: 34,
    jobsCompleted: 20,
    workerApplications: 78
  },
  {
    day: 2,
    dayLabel: "Tue",
    jobsPosted: 28,
    jobsCompleted: 18,
    workerApplications: 65
  },
  {
    day: 3,
    dayLabel: "Wed",
    jobsPosted: 40,
    jobsCompleted: 25,
    workerApplications: 90
  },
  {
    day: 4,
    dayLabel: "Thu",
    jobsPosted: 35,
    jobsCompleted: 28,
    workerApplications: 82
  },
  {
    day: 5,
    dayLabel: "Fri",
    jobsPosted: 50,
    jobsCompleted: 32,
    workerApplications: 110
  },
  {
    day: 6,
    dayLabel: "Sat",
    jobsPosted: 60,
    jobsCompleted: 40,
    workerApplications: 140
  },
  {
    day: 7,
    dayLabel: "Sun",
    jobsPosted: 25,
    jobsCompleted: 17,
    workerApplications: 55
  }
]


type Data = typeof data[number]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const svgDefs = `
  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-desktop)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-desktop)"
      stop-opacity="0.1"
    />
  </linearGradient>
  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-mobile)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-mobile)"
      stop-opacity="0.1"
    />
  </linearGradient>
`
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Weekly Trends</CardTitle>
      <CardDescription>
        Overview of job creation, assignments, and completions over the past 7 days
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="max-h-[250px]">
        <VisXYContainer :data="data" :svg-defs="svgDefs">
          <VisArea :x="(d: Data) => d.day" :y="[(d: Data) => d.jobsCompleted, (d: Data) => d.jobsPosted]"
            :color="(d: Data, i: number) => ['url(#fillMobile)', 'url(#fillDesktop)'][i]" :opacity="0.4" />
          <VisLine :x="(d: Data) => d.day" :y="[(d: Data) => d.jobsCompleted, (d: Data) => d.jobsCompleted + d.jobsPosted]"
            :color="(d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i]" :line-width="1" />
          <VisAxis type="x" :x="(d: Data) => d.day" :tick-line="false" :domain-line="false" :grid-line="false"
            :num-ticks="6" :tick-format="(d: number, index: number) => {
              return data[index]!.dayLabel.slice(0, 3)
            }" />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false"
            :tick-format="(d: number, index: number) => ''" />
          <ChartTooltip />
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { labelKey: 'monthLabel' })"
            :color="(d: Data, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i % 2]" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <!-- <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month
            <TrendingUp class="h-4 w-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter> -->
  </Card>
</template>
