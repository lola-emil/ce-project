<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { collection, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import type { JobRequest } from '@/types/schema';
import { useCollection, useCurrentUser } from 'vuefire';
import { RouterLink } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()
const user = useCurrentUser();

const jobRequestsQuery = computed(() =>
  user.value
    ? query(
        collection(db, "job_requests"),
        where("clientId", "==", user.value.uid)
      )
    : null // skip query until user exists
);

const jobRequests = useCollection<JobRequest>(jobRequestsQuery);

watch(jobRequests, () => {
  console.log("Update Job", jobRequests.data.value);
}); 

const statusOptions =
    ["pending", "assigned", "in-progress", "completed", "marked as complete", "cancelled"];

const selectedStatus = ref<string[]>([])       // Tracks selected items

const filteredJobs = computed(() => {
    return jobRequests.value.filter(job => selectedStatus.value.includes(job.status))
})


</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">{{ t('client.jobsList.title') }}</h3>
            <p class="text-lg text-muted-foreground">{{ t('client.jobsList.subtitle') }}</p>
        </div>

        <div class="mt-10">
            <div class="mb-5 border-b py-3">
                <div class="flex justify-between">
                    <div class="flex items-center gap-5">
                        <Select v-model="selectedStatus" multiple ::placeholder="t('client.jobsList.filters.placeholder')">
                            <SelectTrigger>
                                <span>{{ selectedStatus.length ? selectedStatus.join(', ') : t('client.jobsList.filters.selectStatus') }}</span>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem v-for="status in statusOptions" :key="status" :value="status">
                                    {{ status }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button as-child>
                        <RouterLink to="create-job-request">
                            <Plus />
                            {{ t('client.jobsList.actions.create') }}
                        </RouterLink>
                    </Button>
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
                                <p class="text-muted-foreground text-sm">{{ t('client.jobsList.card.status') }}: <Badge variant="outline">{{
                                    value.status }}
                                    </Badge>
                                </p>
                                <p class="text-muted-foreground text-sm">{{ t('client.jobsList.card.status') }}: <span>{{
                                    value.createdAt.toDate().toLocaleString() }}</span></p>
                                <p class="text-muted-foreground text-sm">{{ t('client.jobsList.card.status') }}: <span class="text-primary">₱{{
                                    value.budget }}</span>
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