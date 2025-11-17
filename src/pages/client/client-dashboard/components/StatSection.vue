<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, ClipboardMinus, DollarSign, UserCheck } from 'lucide-vue-next';
</script>

<template>

    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Jobs Today
                </CardTitle>
                <ClipboardMinus />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    0
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Pending Worker
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
                    5
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
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
                    $45,231.89
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>
    </div>
</template>