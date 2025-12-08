<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
import { computed, watch } from 'vue'
import type { JobRequest } from '@/types/schema'
import { CheckCircle, ClipboardMinus, DollarSign, CircleOff } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'

const authStore = useAuthStore();

const {
    data: jobRequests
} = useCollection<JobRequest>(query(collection(db, "job_requests"), where("clientId", "==", authStore.user?.uid), orderBy("createdAt", "desc"), limit(6)))

const {
    data: assignments
} = useCollection(query(collection(db, "job_requests"), where("clientId", "==", authStore.user?.uid),
    orderBy("createdAt", "asc")))

const {
    data: activities
} = useCollection(query(collection(db, "activity_logs"), orderBy("timestamp", 'asc'), where("for_user", "==", authStore.user?.uid)))

const {
    data
} = useCollection(query(collection(db, "job_requests"), where("status", "==", "completed")));

const totalBudget = computed(() =>
  (data.value ?? []).reduce((sum, doc) => sum + (doc.budget ?? 0), 0)
);

function formatPrice(price: number, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price);
}
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
                            Pending/In Progress Jobs
                        </CardTitle>
                        <ClipboardMinus />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ assignments.length }}
                        </div>
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
                            {{ formatPrice(totalBudget, 'en-US', 'PHP') }}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-5 mt-5 h-[50vh]">
            <Card class="h-full">
                <CardHeader>
                    <div class="">
                        <CardTitle>Job Requests</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="h-full">
                    <div v-if="jobRequests.length > 0" class="flex flex-col gap-2">
                        <Item v-for="value in jobRequests" tem variant="muted">
                            <ItemContent>
                                <ItemTitle>{{ value.title }}</ItemTitle>
                                <ItemDescription>
                                      {{ value.createdAt.toDate().toLocaleDateString() }}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" size="sm">
                                    <RouterLink :to="'/clie nt/job-details/' + value.id">
                                        View Details
                                    </RouterLink>
                                </Button>
                            </ItemActions>
                        </Item>
                    </div>

                    <div v-else class="flex flex-col items-center justify-center h-full">
                        <div class="text-muted-foreground p-5 rounded-full bg-secondary">
                            <CircleOff :size="16 * 3" />
                        </div>
                        <p class="text-muted-foreground mt-5">No requests yet.</p>
                    </div>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent class="h-full">
                    <div v-if="activities.length > 0" class="flex flex-col gap-2">
                        <Item v-for="value in activities" variant="outline">
                            <ItemContent>
                                <ItemTitle>Outline Variant</ItemTitle>
                                <ItemDescription>
                                    Outlined style with clear borders and transparent background.
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" size="sm">
                                    View Details
                                </Button>
                            </ItemActions>
                        </Item>
                    </div>


                    <div v-else class="flex flex-col items-center justify-center h-full">
                        <div class="text-muted-foreground p-5 rounded-full bg-secondary">
                            <CircleOff :size="16 * 3" />
                        </div>
                        <p class="text-muted-foreground mt-5">No activities yet.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>

    <br>
    <br>
    <br>
</template>
