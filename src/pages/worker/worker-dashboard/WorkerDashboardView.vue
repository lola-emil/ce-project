<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { db } from '@/firebase';
import { query, collection, where, limit, doc, getDoc } from 'firebase/firestore';
import { useCollection, useCurrentUser } from 'vuefire';
import { computed, onMounted, ref, watch } from 'vue';
import type { JobAssignment, JobRequest, Rating, User } from '@/types/schema';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()
const authStore = useAuthStore();
const user = useCurrentUser();

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
});

const ratings = ref<Rating[]>([]);
const averageRating = computed(() => {
    if (!ratings.value.length) return 0;

    const sum = ratings.value.reduce((total, r) => total + r.rate, 0);
    return sum / ratings.value.length;
});

onMounted(async () => {
    console.log("Current user", authStore.userData?.ratings);

    const userRef = await getDoc(doc(db, "users", user.value!.uid));

    const result = userRef.data() as User;

    ratings.value = result.ratings ?? [];
})

</script>


<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">{{ t('worker.workerDashboard.greeting', {name: authStore.userData?.name?.firstname}) }}</h3>
            <p class="text-lg text-muted-foreground">{{ t('worker.workerDashboard.overview') }}</p>
        </div>
        <div class="mt-10">

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">
                            {{ t('worker.workerDashboard.cards.active') }}
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
                            {{ t('worker.workerDashboard.cards.completed') }}
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
                            {{ t('worker.workerDashboard.cards.rating', {count: ratings.length}) }}
                        </CardTitle>
                        <Star />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ averageRating.toFixed(1) }} <span class="text-sm">/ 5.0</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="mt-10">
            <p class="mb-5">{{ t('worker.workerDashboard.assigned.title')}}</p>
            <div class="flex flex-col gap-3">
                <Card class="gap-2" v-for="value in jobs">
                    <CardHeader>
                        <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-col gap-1">
                            <p class="text-muted-foreground text-sm">{{ t('worker.workerDashboard.assigned.date')}}: <span>{{
                                value.createdAt.toDate().toLocaleString() }}</span></p>
                            <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱{{ value.budget
                            }}</span>
                            </p>
                            <p class="text-muted-foreground text-sm">{{ t('worker.workerDashboard.assigned.location')}}: {{ value.location.description }}
                            </p>

                        </div>
                        <br>
                        <RouterLink :to="'/worker/job-details/' + value.id"
                            class="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary">
                            {{ t('worker.workerDashboard.assigned.viewDetails')}}
                        </RouterLink>
                        <div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>


    <br>
    <br>
    <br>
</template>
