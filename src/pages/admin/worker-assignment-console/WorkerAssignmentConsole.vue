<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { computed, ref } from 'vue';
import { collection, query } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { db } from '@/firebase';
import type { JobRequest } from '@/types/schema';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const jobRequestsRef = collection(db, "job_requests");
const jobRequestQuery = query(jobRequestsRef)
const jobRequests = useCollection<JobRequest>(jobRequestQuery);

const statusOptions =
    ["pending", "assigned", "in-progress", "completed", "marked as complete", "cancelled"];

const selectedStatus = ref<string[]>([])       // Tracks selected items

const filteredJobs = computed(() => {
  return jobRequests.value.filter(job => selectedStatus.value.includes(job.status))
})
</script>

<template>
    <div class="container mx-auto px-5 lg:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Worker Assignment</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>
        <div class="mt-10">
            <div class="mb-5 border-b py-3">
                <div class="flex justify-between">
                    <div class="flex items-center gap-5">
                        <Select v-model="selectedStatus" multiple placeholder="Filter Jobs">
                            <SelectTrigger>
                                <span>{{ selectedStatus.length ? selectedStatus.join(', ') : 'Select Status' }}</span>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem v-for="status in statusOptions" :key="status" :value="status">
                                    {{ status }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <RouterLink v-for="value in (selectedStatus.length > 0 ? filteredJobs : jobRequests) as any" :to="'job-details/' + value.id">
                    <Card class="gap-2">
                        <CardHeader>
                            <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p class="text-muted-foreground text-sm">Status: <Badge variant="outline">{{
                                    value.status }}
                                    </Badge>
                                </p>
                                <p class="text-muted-foreground text-sm">Date: <span>{{
                                    value.createdAt.toDate().toLocaleString() }}</span></p>
                                <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱{{
                                    value.budget }}</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </RouterLink>
            </div>
        </div>
    </div>
</template>