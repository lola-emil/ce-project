<script setup lang="ts">
import { RouterLink } from 'vue-router'
import StatSection from './components/StatSection.vue'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCollection } from 'vuefire'
import { watch } from 'vue'
import type { JobRequest } from '@/types/schema'
import { CheckCircle, ClipboardMinus, DollarSign, UserCheck } from 'lucide-vue-next';
const authStore = useAuthStore();

const recentActivities = [
    {
        title: "Masonry Repair Job",
        description: "Worker Assigned"
    },

    {
        title: "Roof Leak Fix",
        description: "Worker Assigned"
    },

    {
        title: "Gate Welding",
        description: "Completed"
    },
]

const {
    data: jobRequests
} = useCollection<JobRequest>(query(collection(db, "job_requests"), where("clientId", "==", authStore.user?.uid), orderBy("createdAt", "asc"), limit(2)))

const {
    data: assignments
} = useCollection(query(collection(db, "job_requests"), where("clientId", "==", authStore.user?.uid),
    orderBy("createdAt", "asc")))

const {
    data: activities
} = useCollection(query(collection(db, "activity_logs"), orderBy("timestamp", 'asc'), where("for_user", "==", authStore.user?.uid)))

watch(jobRequests, () => {
    console.log(jobRequests.value);
})

watch(activities, () => {
    console.log(activities.value);
})
</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Good day, {{ authStore.userData?.name?.firstname }}</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>

        <div class="mt-10">
            <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-5">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Jobs Today
                        </CardTitle>
                        <ClipboardMinus />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ assignments.length }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last month
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
                            5
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            Total Spent
                        </CardTitle>
                        <DollarSign />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            $45,231.89
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="mt-10">
            <p class="mb-5">Recent Job Requests</p>
            <div class="flex flex-col gap-3">
                <Card class="gap-2" v-for="value in jobRequests">
                    <CardHeader>
                        <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div class="text-muted-foreground text-sm">Status:
                                <Badge variant="outline">{{ value.status }}
                                </Badge>
                            </div>
                            <p class="text-muted-foreground text-sm">Date: <span>{{
                                value.createdAt.toDate().toLocaleString() }}</span></p>
                            <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱{{ value.budget
                                    }}</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

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
                            <!-- <Button variant="outline" size="sm">
                                Action
                            </Button> -->
                        </ItemActions>
                    </RouterLink>
                </Item>
            </div>
        </div>
    </div>

    <br>
    <br>
    <br>
</template>
