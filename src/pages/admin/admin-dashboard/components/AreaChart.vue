<script setup lang="ts">
import { ref, computed } from "vue";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { useCollection } from "vuefire";

import { db } from "@/firebase";
import type { JobRequest, JobStatus } from "@/types/schema";

import { VisXYContainer, VisGroupedBar, VisAxis } from "@unovis/vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartCrosshair,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart";

// --- Helper Functions ---
function getPast7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

const chartStatuses: JobStatus[] = ["pending", "assigned", "completed"];
const statusColors: Record<JobStatus, string> = {
  pending: "var(--chart-1)",
  assigned: "var(--chart-2)",
  "in-progress": "var(--chart-3)",
  completed: "var(--chart-4)",
  "marked as complete": "var(--chart-5)",
  cancelled: "var(--chart-6)",
};

// --- Firestore Query ---
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // include today

const q = query(
  collection(db, "job_requests"),
  where("createdAt", ">=", Timestamp.fromDate(sevenDaysAgo))
);

const { data: jobs } = useCollection<JobRequest>(q);

// --- Process Data ---
type DayData = { date: number; pending: number; assigned: number; completed: number };

const barChartData = computed<DayData[]>(() => {
  const days = getPast7Days();
  return days.map((day) => {
    const jobsForDay = jobs.value?.filter((job) => {
      const jobDate = job.createdAt.toDate();
      return (
        jobDate.getFullYear() === day.getFullYear() &&
        jobDate.getMonth() === day.getMonth() &&
        jobDate.getDate() === day.getDate()
      );
    }) ?? [];

    return {
      date: day.getTime(), // convert to timestamp for Unovis
      pending: jobsForDay.filter(j => j.status === "pending").length,
      assigned: jobsForDay.filter(j => j.status === "assigned").length,
      completed: jobsForDay.filter(j => j.status === "completed").length,
    };
  });
});

// Chart config for legend and colors
const chartConfig = {
  pending: { label: "Pending", color: statusColors.pending },
  assigned: { label: "Assigned", color: statusColors.assigned },
  completed: { label: "Completed", color: statusColors.completed },
} as Record<JobStatus, { label: string; color: string }>;

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Weekly Job Requests</CardTitle>
      <CardDescription>
        Number of jobs created, assigned, and completed in the last 7 days
      </CardDescription>
    </CardHeader>

    <CardContent>
      <ChartContainer :config="chartConfig">
        <VisXYContainer :data="barChartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">

          <!-- Grouped Bar Chart -->
          <VisGroupedBar :x="(d: DayData) => d.date" :y="[
            (d: DayData) => d.pending,
            (d: DayData) => d.assigned,
            (d: DayData) => d.completed
          ]" :color="(d: any, i: any) => [statusColors.pending, statusColors.assigned, statusColors.completed][i]"
            :rounded-corners="4" />

          <!-- X Axis -->
          <VisAxis type="x" :x="(d: DayData) => d.date" :tick-line="false" :domain-line="false" :grid-line="false"
            :num-ticks="7" :tick-format="(d: number | Date) => {
              const date = new Date(d);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }" />

          <!-- Y Axis -->
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />

          <!-- Tooltip -->
          <ChartTooltip :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" />


          <!-- Crosshair -->
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
            :color="(d: any, i: any) => [statusColors.pending, statusColors.assigned, statusColors.completed][i % 3]" />

        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
