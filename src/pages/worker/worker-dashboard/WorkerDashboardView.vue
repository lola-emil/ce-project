<script setup lang="ts">
import StatSection from './components/StatSection.vue';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { db } from '@/firebase';
import { query, collection, orderBy, where, limit, doc, getDoc } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { ref, watch } from 'vue';
import type { JobAssignment, JobRequest } from '@/types/schema';

const recentActivities = [
    {
        title: "Masonry Repair Job",
        description: "Assigned to you"
    },

    {
        title: "Gate Welding",
        description: "Completed - yesterday"
    },
]
const authStore = useAuthStore();

const assignments = useCollection<JobAssignment>(query(collection(db, "job_assignments"), where("workerId", "==", authStore.user?.uid), limit(2)));
const jobs = ref<JobRequest[]>([]);

const { data: activeJobs } = useCollection<JobAssignment>(query(collection(db, "job_assignments"), where("workerId", "==", authStore.user?.uid),
where("status", "not-in", ["completed", "failed", "declined"])));


const { data: completed } = useCollection<JobAssignment>(query(collection(db, "job_assignments"), where("workerId", "==", authStore.user?.uid),
where("status", "in", ["completed"])));

watch(assignments, async () => {

    assignments.value.forEach(async val => {
        const jobRequestRef = await getDoc(doc(db, "job_requests", val.jobId));

        if (jobRequestRef.exists()) {
            jobs.value.push({ id: jobRequestRef.id, ...jobRequestRef.data() } as JobRequest);
        }
    });
})

</script>


<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Good day, {{ authStore.userData?.name?.firstname }}</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>
        <div class="mt-10">

            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Today's Earnings
                        </CardTitle>
                        <DollarSign />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            ₱850
                        </div>
                        <p class="text-xs text-muted-foreground">
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Active Jobs
                        </CardTitle>
                        <UserCheck />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ activeJobs.length }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            <!-- +20.1% from last month -->
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Completed Jobs
                        </CardTitle>
                        <CheckCircle />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ completed.length }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            <!-- +20.1% from last month -->
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Rating
                        </CardTitle>
                        <Star />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            4.8 <span class="text-sm">/ 5.0</span>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="mt-10">
            <p class="mb-5">Assigned Jobs</p>
            <div class="flex flex-col gap-3">
                <Card class="gap-2" v-for="value in jobs">
                    <CardHeader>
                        <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-col gap-1">
                            <p class="text-muted-foreground text-sm">Date: <span>{{
                                value.createdAt.toDate().toLocaleString() }}</span></p>
                            <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱{{ value.budget
                            }}</span>
                            </p>
                            <p class="text-muted-foreground text-sm">Location: {{ value.location.description }}
                            </p>

                        </div>
                        <br>
                        <RouterLink :to="'/worker/job-details/' + value.id"
                            class="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary">View
                            Details</RouterLink>
                        <div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <!-- 
        <div class="mt-10">
            <p class="mb-5">Recent Activities</p>
            <div class="flex flex-col gap-3">
                <Item v-for="value in activities" variant="outline" as-child>
                    <RouterLink to="#">
                        <ItemContent>
                            <ItemTitle>{{ value.title }}</ItemTitle>
                            <ItemDescription>
                                {{ value.description }}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>

                        </ItemActions>
                    </RouterLink>
                </Item>
            </div>
        </div>-->
    </div>


    <br>
    <br>
    <br>
</template>
