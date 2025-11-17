<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, DollarSign, Star, UserCheck } from 'lucide-vue-next';
</script>

<template>

    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Today's Earnings
                </CardTitle>
                <DollarSign />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    ₱850
                </div>
                <p class="text-xs text-muted-foreground">
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Active Jobs
                </CardTitle>
                <UserCheck />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    3
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
                    45
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Rating
                </CardTitle>
                <Star />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    4.8/<span class="text-sm">5.0</span>
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>
    </div>
</template>