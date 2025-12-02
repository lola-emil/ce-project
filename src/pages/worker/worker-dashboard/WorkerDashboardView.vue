<script setup lang="ts">
import StatSection from './components/StatSection.vue';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

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
</script>


<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Good day, {{ authStore.userData?.name?.firstname }}</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>
        <div class="mt-10">
            <StatSection />
        </div>

        <div class="mt-10">
            <p class="mb-5">Assigned Jobs</p>
            <div class="flex flex-col gap-3">
                <Card class="gap-2">
                    <CardHeader>
                        <CardTitle class="text-sm">Tile Repair (Small Area)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="flex flex-col gap-1">
                            <p class="text-muted-foreground text-sm">Date: <span>Jan 12, 2026</span></p>
                            <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱1,200</span>
                            </p>
                            <p class="text-muted-foreground text-sm">Location: Danao City, Cebu <span
                                    class="text-primary">(1.2km)</span>
                            </p>

                        </div>
                        <br>
                        <RouterLink to="#"
                            class="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary">View
                            Details</RouterLink>
                        <div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div class="mt-10">
            <p class="mb-5">Recent Activities</p>
            <div class="flex flex-col gap-3">
                <Item v-for="value in recentActivities" variant="outline" as-child>
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
