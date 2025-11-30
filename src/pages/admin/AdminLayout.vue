<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { cn } from '@/utils/util';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "/admin/dashboard",
        title: "Overview"
    },

    {
        path: "/admin/user-management",
        title: "User Management"
    },


    {
        path: "/admin/worker-assignment-console",
        title: "Worker Assignment"
    },

    // {
    //     path: "payment-commission-management",
    //     title: "Payments"
    // },

    {
        path: "/admin/settings",
        title: "Settings"
    },
];

</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>

