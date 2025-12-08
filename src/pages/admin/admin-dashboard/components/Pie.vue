<script setup lang="ts">
import type {
  ChartConfig,
} from "@/components/ui/chart"

import { Donut } from "@unovis/ts"
import { VisDonut, VisSingleContainer } from "@unovis/vue"
import { TrendingUp } from "lucide-vue-next"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart"
import { db } from "@/firebase"
import type { JobRequest, JobStatus } from "@/types/schema"
import { collection } from "firebase/firestore"
import { useCollection } from "vuefire"
import { computed } from "vue"

const { data: jobs } = useCollection<JobRequest>(
  collection(db, "job_requests")
);

const statuses: JobStatus[] = [
  "pending",
  "assigned",
  "in-progress",
  "completed",
  "marked as complete",
  "cancelled",
];

const chartConfig = {
  visitors: {
    label: "Job Requests",
    color: undefined,
  },

  pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },

  assigned: {
    label: "Assigned",
    color: "var(--chart-2)",
  },

  "in-progress": {
    label: "In Progress",
    color: "var(--chart-3)",
  },

  completed: {
    label: "Completed",
    color: "var(--chart-4)",
  },

  "marked as complete": {
    label: "Marked as Complete",
    color: "var(--chart-5)",
  },

  cancelled: {
    label: "Cancelled",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig
type Data = {
  status: JobStatus
  visitors: number
  fill: string
}

const chartData = computed(() =>
  statuses.map((status) => ({
    status,
    visitors: jobs.value?.filter((j) => j.status === status).length ?? 0,
    fill: chartConfig[status].color,
  }))
);


</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="items-center pb-0">
      <CardTitle>Jobs by Status</CardTitle>
      <CardDescription>All time</CardDescription>
    </CardHeader>
    <CardContent class="flex-1 pb-0">
      <ChartContainer :config="chartConfig" class="mx-auto aspect-square max-h-[250px]">
        <VisSingleContainer :data="chartData" :margin="{ top: 30, bottom: 30 }">
          <VisDonut :value="(d: Data) => d.visitors"
            :color="(d: Data) => chartConfig[d.status as keyof typeof chartConfig].color" :arc-width="30" />

          <ChartTooltip :triggers="{
            [Donut.selectors.segment]:
              componentToString(chartConfig, ChartTooltipContent, { hideLabel: false })!,
          }" />
        </VisSingleContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col gap-2 text-sm">
      <!-- <div class="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month
        <TrendingUp class="h-4 w-4" />
      </div> -->
      <div class="leading-none text-muted-foreground">
        Showing total job by status.
      </div>
    </CardFooter>
  </Card>
</template>
