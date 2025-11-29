<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconLayoutColumns, IconChevronDown } from '@tabler/icons-vue';
import { Plus } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { collection, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import type { JobRequest } from '@/types/schema';
import { useCollection } from 'vuefire';
import { useAuthStore } from '@/stores/authStore';
import { RouterLink } from 'vue-router';
import { watch } from 'vue';

const authStore = useAuthStore();

const jobRequestsRef = collection(db, "job_requests");
const jobRequestQuery = query(jobRequestsRef, where("clientId", "==", authStore.user?.uid))

const jobRequests = useCollection<JobRequest[]>(jobRequestQuery);

watch(jobRequests, () => {
    console.log("Update Job", jobRequests.data.value);
})
</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Jobs Lists</h3>
            <p class="text-lg text-muted-foreground">Your job creations in one place.</p>
        </div>

        <div class="mt-10">
            <div class="mb-5 border-b py-3">
                <div class="flex justify-between">
                    <div class="flex items-center gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="outline">
                                    <IconLayoutColumns />
                                    <span class="hidden lg:inline">Filter Jobs</span>
                                    <span class="lg:hidden">Columns</span>
                                    <IconChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <DropdownMenuCheckboxItem class="capitalize">
                                    Kuan
                                </DropdownMenuCheckboxItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Input placeholder="Search" class="min-w-xs hidden md:block" />

                    </div>
                    <Button as-child>
                        <RouterLink to="create-job-request">
                            <Plus />
                            Create job request
                        </RouterLink>
                    </Button>
                </div>

                <div class="mt-3 md:hidden">
                    <Input placeholder="Search" class="min-w-xs" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <RouterLink v-for="value in jobRequests as any" :to="'job-details/' + value.id">
                    <Card class="gap-2">
                        <CardHeader>
                            <CardTitle class="text-sm">{{ value.title }}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p class="text-muted-foreground text-sm">Status: <Badge variant="outline">{{ value.status }}
                                    </Badge>
                                </p>
                                <p class="text-muted-foreground text-sm">Date: <span>{{ value.createdAt.toDate().toLocaleString() }}</span></p>
                                <p class="text-muted-foreground text-sm">Budget: <span
                                        class="text-primary">₱{{ value.budget }}</span>
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