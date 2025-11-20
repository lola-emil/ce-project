<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { cn } from '@/utils/util';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "dashboard",
        title: "Overview"
    },

    {
        path: "job-management",
        title: "Workforce and Jobs"
    },

    // {
    //     path: "payment-commission-management",
    //     title: "Payments"
    // },

    {
        path: "settings",
        title: "Settings"
    },
];

</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>

