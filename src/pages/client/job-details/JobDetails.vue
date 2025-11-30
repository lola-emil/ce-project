<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocument } from 'vuefire';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import type { JobRequest } from '@/types/schema';

const route = useRoute();

const jobId = String(route.params.id);

const jobRef = doc(db, "job_requests", jobId);
const {
    data: job,
} = useDocument<JobRequest>(jobRef);

</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <Button variant="link" as-child>
                <RouterLink to="/client/my-jobs">
                    <ArrowLeft /> Go back
                </RouterLink>
            </Button>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-36">

            <div class="flex items-center">
                <Carousel class="w-md mx-auto">
                    <CarouselContent>
                        <CarouselItem v-if="job?.images" v-for="(image, i) in job?.images" :key="i">
                            <div class="p-1 h-96">
                                <img :src="image" alt="preview" class="h-full w-full object-contain">
                            </div>
                        </CarouselItem>

                        <CarouselItem v-else>
                            <div class="p-1 h-96 bg-secondary">

                            </div>
                        </CarouselItem>

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div>
                <h3 class="text-lg">"{{ job?.title }}"</h3>
                <p class="text-muted-foreground mt-5">{{ job?.description }}</p>
                
                    <p>Status: <span class="text-primary">{{ job?.status }}</span></p>

                <div class="mt-5 grid grid-cols-2 gap-5">
                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Location
                            </p>

                            <div class="text-lg font-bold">
                                {{ job?.location.description }}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Date
                            </p>

                            <div class="text-lg font-bold">
                                {{ new Intl.DateTimeFormat('en-US', {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                }).format(job?.createdAt.toDate()) }}
                            </div>
                        </CardContent>
                    </Card>


                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Budget
                            </p>

                            <div class="text-lg font-bold">
                                Php {{ job?.budget.toFixed(2) }}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    </div>
</template>