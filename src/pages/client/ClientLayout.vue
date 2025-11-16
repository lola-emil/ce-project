<script setup lang="ts">
import { RouterView } from 'vue-router';
import { cn } from '@/utils/util';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "dashboard",
        title: "Overview"
    },

    {
        path: "my-jobs",
        title: "My Jobs"
    },

    {
        path: "payments",
        title: "Payments"
    },
]

</script>

<template>
    <LayoutNav :menu-items="routes"/>
    <RouterView />
</template>
