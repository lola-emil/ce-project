<template>
    <UserHeader></UserHeader>
    <div class="min-h-[calc(100vh-4rem)] container mx-auto">

        <!-- Main feed -->
        <div>
            <br>
            <div>
                <h2 class="text-4xl">Hi, Rens! 👋</h2>
            </div>
            <br>


            <Card class="mt-5">
                <CardContent>
                    <p class="text-2xl">Your Workspace</p>
                    <p class="text-muted-foreground">You don't have any tasks that required your attention.</p>
                    <br>

                    <div class=" flex items-center gap-3">
                        <RouterLink class="text-underline text-primary" to="">
                            <Button>
                                Post a job
                            </Button>
                        </RouterLink>
                        <RouterLink to="" class="text-underline text-primary">
                            <Button variant="outline">
                                View all job postings
                            </Button>
                        </RouterLink>

                    </div>
                </CardContent>
            </Card>
            <br>

            <div>
                <h2 class="text-2xl">Browse our highest-rated workers</h2>
                <p>Here's the best with expert-velted talent.</p>
            </div>

            <br>
            <div>
                <div class="grid grid-cols-4 gap-5">
                    <RouterLink v-for="value in workerStore.workers" to="/profile" as-child>
                        <motion.div :whileHover="{
                            scale: [null, 1.05],
                            transition: {
                                duration: 0.5,
                                times: [0, 0.6, 1],
                                ease: ['easeInOut', 'easeOut']
                            }
                        }" :transition="{
                            duration: 0.3,
                            ease: 'easeOut'
                        }" as-child class="cursor-pointer">
                            <Card>
                                <CardContent>
                                    <div class="bg-muted w-full h-35 rounded">
                                    </div>
                                    <p class="mt-3 font-semibold">{{ value.name }}</p>
                                    <p class="text-muted-foreground">{{ value.skill }}</p>

                                </CardContent>
                                <CardFooter>
                                    <div class="flex w-full justify-between items-center">
                                        <div class="flex gap-2 items-center">
                                            <span>Rate: {{ value.ratings }}</span>
                                            <Star :size="18" />
                                        </div>
                                        <div>
                                            Php {{ value.rate }} / day
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </RouterLink>
                </div>

                <div class="w-full flex justify-center mt-5">
                    <RouterLink to="" as-child>
                        <span class="hover:underline text-primary" variant="ghost">Browse more workers</span>
                    </RouterLink>
                </div>

                <br>    
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import UserHeader from '../../components/UserHeader.vue';
import { RouterLink } from "vue-router";
import Button from '../../components/ui/button/Button.vue';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../../components/ui/card';
import { useWorkerStore } from '../../stores/workers';
import { motion } from "motion-v";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../components/ui/tooltip';
import { Star } from 'lucide-vue-next';


const workerStore = useWorkerStore();

const range = (size: number) => new Array(size);
</script>