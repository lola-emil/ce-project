<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Briefcase, CheckCircle, DollarSign, UserCheck } from 'lucide-vue-next';

</script>


<template>
    <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Jobs Today
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
                    Active Users
                </CardTitle>
                <UserCheck />
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
                    Pending Jobs
                </CardTitle>
                <Briefcase />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    11
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Total Revenue
                </CardTitle>
                <DollarSign/>
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    ₱45,231.89
                </div>
                <p class="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>
    </div>
</template>