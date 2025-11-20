<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Good day, Pedro</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>

        <div class="mt-10">
            <StatSection />
        </div>

        <div class="mt-10">
            <p class="mb-5">Recent Job Requests</p>
            <div class="flex flex-col gap-3">
                <Card class="gap-2">
                    <CardHeader>
                        <CardTitle class="text-sm">Bathroom Tile Repair</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div class="text-muted-foreground text-sm">Status: 
                                    <Badge variant="outline">Awaiting Order
                                </Badge>
                            </div>
                            <p class="text-muted-foreground text-sm">Date: <span>Jan 12, 2026</span></p>
                            <p class="text-muted-foreground text-sm">Budget: <span class="text-primary">₱3,000</span>
                            </p>
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
</template>


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
</script>
