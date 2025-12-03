<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Briefcase, CheckCircle, DollarSign, UserCheck } from 'lucide-vue-next';

import ChartSection from './components/ChartSection.vue';
import DataTable from './components/DataTable.vue';
import { collection, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "vuefire";
import { watch } from "vue";
import type { ActivityLog } from "@/types/schema";


const { data: jobs } = useCollection(query(
  collection(db, "job_requests"),
  where("status", "in", ["pending", "assigned", "in-progress"])))

const { data: users } = useCollection(query(collection(db, "users"), where("role", "!=", "admin")));

const {data: logs} = useCollection<ActivityLog>(collection(db, "activity_logs"));

watch(logs, () => {
  console.log(logs.value);
})
</script>

<template>


  <main class="mt-5">
    <div class="container mx-auto px-5 md:px-0">
      <section>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Jobs Today
              </CardTitle>
              <CheckCircle />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                {{ jobs.length }}
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Active Users
              </CardTitle>
              <UserCheck />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                {{ users.length }}
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Pending Jobs
              </CardTitle>
              <Briefcase />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                11
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                ₱45,231.89
              </div>
              <p class="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section class="mt-5">
        <ChartSection />
      </section>

      <section class="mt-5">
        <DataTable :data="logs" />
      </section>
    </div>
  </main>

  <br>
  <br>
</template>
