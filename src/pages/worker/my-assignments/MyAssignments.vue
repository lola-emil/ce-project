<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconLayoutColumns, IconChevronDown } from '@tabler/icons-vue';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { useCollection } from 'vuefire';
import { useAuthStore } from '@/stores/authStore';
import { onMounted, ref, watch } from 'vue';
import type { JobAssignment, JobRequest } from '@/types/schema';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()

const authStore = useAuthStore();

const jobAssignmentRef = query(collection(db, "job_assignments"), where("workerId", "==", authStore.user?.uid));
const jobAssignments = useCollection<JobAssignment>(jobAssignmentRef);
const jobs = ref<JobRequest[]>([])

watch(jobAssignments, () => {
    console.log(authStore.user?.uid);
    console.log("What the fuck", jobAssignments.value);

    jobAssignments.value.forEach(async val => {
        const jobRef = doc(db, "job_requests", val.jobId);
        const jobSnap = await getDoc(jobRef)

        if (jobSnap.exists()) {
            jobs.value.push({ id: jobSnap.id, ...jobSnap.data() } as JobRequest);
            console.log(jobSnap.data());
        }
    })
});

</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">{{ t('worker.assignedJobs.title') }}</h3>
            <p class="text-lg text-muted-foreground">{{ t('worker.assignedJobs.subtitle') }}</p>
        </div>

        <div class="mt-10">
            <div class="mb-5 border-b py-3">
                <div class="flex justify-between">
                    <div class="flex items-center gap-5">
                        <!-- <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="outline">
                                    <IconLayoutColumns />
                                    <span class="hidden lg:inline">{{ t('worker.assignedJobs.filters.filterJobs') }}</span>
                                    <span class="lg:hidden">Columns</span>
                                    <IconChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <DropdownMenuCheckboxItem class="capitalize">
                                    Kuan
                                </DropdownMenuCheckboxItem>

                            </DropdownMenuContent>
                        </DropdownMenu> -->

                        <Input placeholder="Search" class="min-w-xs hidden md:block" />

                    </div>

                </div>

                <div class="mt-3 md:hidden">
                    <Input placeholder="Search" class="min-w-xs" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <RouterLink v-for="value in jobs" :to="'/worker/job-details/' + value.id">
                    <Card class="gap-2">
                        <CardHeader>
                            <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p class="text-muted-foreground text-sm">
                                    Status: 
                                    <Badge variant="outline">{{ value.status }}</Badge>
                                </p>
                                <p class="text-muted-foreground text-sm">{{ t('worker.assignedJobs.card.date') }}: <span>{{
                                    new Intl.DateTimeFormat('en-US', {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    }).format(value?.createdAt.toDate()) }}</span></p>
                                <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱{{
                                        value.budget }}</span>
                                </p>
                                <p class="text-muted-foreground text-sm">{{ t('worker.assignedJobs.card.location') }}: {{ value.location?.description }}
                                    <!-- <span class="text-primary">(1.2km)</span> -->
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </RouterLink>
            </div>
        </div>
    </div>
    <br>
    <br>
    <br>
</template>